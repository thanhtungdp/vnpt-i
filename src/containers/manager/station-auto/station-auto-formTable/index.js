import React from 'react'
import { Form, Button, Select, Table, Popconfirm, Icon } from 'antd'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import { langPropTypes } from '../../../../hoc/create-lang'
import AutoCompleteCell from 'components/elements/auto-complete-cell'
import InputNumberCell from '../../../../components/elements/input-number-cell'
import update from 'immutability-helper'

const FormItem = Form.Item

@autobind
export default class StationAutoFormTable extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
    lang: langPropTypes,
    dataSource: PropTypes.array,
    measuringListSource: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {}
    const { t } = this.props.lang
    const { getFieldDecorator } = this.props.form
    this.columns = [
      {
        dataIndex: 'measuringKey',
        title: t('stationAutoManager.form.measuringKey.label'),
        width: 140,
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator(`measuringList[${index}].key`, {
              initialValue: text
            })(<span>{text}</span>)}
          </FormItem>
        )
      },
      {
        dataIndex: 'measuringName',
        title: t('stationAutoManager.form.measuringName.label'),
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator(`measuringList[${index}].name`, {
              initialValue: record.name,
              rules: [
                {
                  required: true,
                  message:
                    'Please select ' +
                    t('stationAutoManager.form.measuringName.label')
                }
              ]
            })(
              <AutoCompleteCell
                editable={true}
                onChange={value =>
                  this.handleChangeMeasuring(value, index, 'name')
                }
                options={this.props.measuringListSource.map(d => (
                  <Select.Option key={d.key} value={d.key}>
                    {d.name}
                  </Select.Option>
                ))}
                autoFocus={true}
              />
            )}
          </FormItem>
        )
      },
      {
        dataIndex: 'minLimit',
        title: t('stationAutoManager.form.measuringMinLimit.label'),
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator(`measuringList[${index}].minLimit`, {
              initialValue: text
            })(<InputNumberCell editable={true} />)}
          </FormItem>
        )
      },
      {
        dataIndex: 'maxLimit',
        title: t('stationAutoManager.form.measuringMaxLimit.label'),
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator(`measuringList[${index}].maxLimit`, {
              initialValue: text
            })(<InputNumberCell editable={true} />)}
          </FormItem>
        )
      },
      {
        dataIndex: 'unit',
        title: t('stationAutoManager.form.measuringUnit.label'),
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator(`measuringList[${index}].unit`, {
              initialValue: text
            })(<span>{text}</span>)}
          </FormItem>
        )
      },
      {
        dataIndex: 'name',
        title: '', //Action
        render: (text, record, index) => {
          return (
            <div className="editable-row-operations">
              {index !== -1 && (
                <span>
                  <Popconfirm
                    title={t('stationAutoManager.delete.require')}
                    onConfirm={() => this.removeMeasuring(index)}
                  >
                    <a>
                      <Icon
                        type="delete"
                        style={{ marginLeft: '5px', color: 'red' }}
                      />
                    </a>
                  </Popconfirm>
                </span>
              )}
            </div>
          )
        }
      }
    ]
  }
  async componentWillMount() {
    this.setState({
      measuringList: this.props.dataSource.map((item, index) => {
        item.measuringKey = item.key
        item.key = index
        return item
      })
    })
  }

  handleAddRow() {
    const newRow = {
      key: this.state.measuringList.length,
      name: '',
      unit: ''
    }
    let rows = this.state.measuringList.slice()
    rows = update(rows, { $push: [newRow] })
    this.setState({ measuringList: rows })
  }

  removeMeasuring(index) {
    this.state.measuringList.splice(index, 1)
    this.forceUpdate()
  }

  handleChangeMeasuring(value, index, column) {
    const measure = this.props.measuringListSource.find(
      item => item.key === value
    )
    this.setState(
      update(this.state, {
        measuringList: {
          [index]: {
            measuringKey: { $set: value },
            unit: { $set: measure.unit }
          }
        }
      })
    )
  }

  render() {
    const { t } = this.props.lang
    return (
      <div>
        <Button
          style={{ right: '0', marginBottom: '16px' }}
          type="primary"
          onClick={this.handleAddRow}
        >
          {t('stationAutoManager.addMeasuring.label')}
        </Button>
        <Table
          bordered
          dataSource={this.state.measuringList}
          columns={this.columns}
          pagination={{
            pageSize: 1000,
            hideOnSinglePage: true
          }}
        />
      </div>
    )
  }
}
