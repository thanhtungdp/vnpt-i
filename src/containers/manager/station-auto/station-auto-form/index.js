import React from 'react'
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Table,
  Popconfirm,
  Icon,
  Checkbox
} from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import CategoryApi from 'api/CategoryApi'
import update from 'immutability-helper'
import SelectStationType from 'components/elements/select-station-type'
import AutoCompleteCell from 'components/elements/auto-complete-cell'
import InputNumberCell from '../../../../components/elements/input-number-cell'
import createLanguageHoc, { langPropTypes } from '../../../../hoc/create-lang'

const FormItem = Form.Item

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationAutoForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEdit: PropTypes.bool,
    initialValues: PropTypes.object,
    lang: langPropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      stationType: {},
      stationTypes: [],
      measuringList: [],
      measuringListSource: [],
      measuringOps: [],
      options: {}
    }
    const { t } = this.props.lang
    this.columns = [
      {
        dataIndex: 'key',
        title: t('stationAutoManager.form.measuringKey.label'),
        width: 150
      },
      {
        dataIndex: 'name',
        title: t('stationAutoManager.form.measuringName.label'),
        render: (text, record) => this.renderSelectColumns(text, record, 'name')
      },
      {
        dataIndex: 'minLimit',
        title: t('stationAutoManager.form.measuringMinLimit.label'),
        render: (text, record) => this.renderColumns(text, record, 'minLimit')
      },
      {
        dataIndex: 'maxLimit',
        title: t('stationAutoManager.form.measuringMaxLimit.label'),
        render: (text, record) => this.renderColumns(text, record, 'maxLimit')
      },
      {
        dataIndex: 'unit',
        title: t('stationAutoManager.form.measuringUnit.label')
      },
      {
        dataIndex: 'name',
        title: 'Action',
        render: (text, record) => {
          const { editable } = record
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <a onClick={() => this.saveMeasuring(record.key)}>
                    <Icon type="save" />
                  </a>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancelMeasuring(record.key)}
                  >
                    <a>
                      <Icon type="close" />
                    </a>
                  </Popconfirm>
                </span>
              ) : (
                  <span>
                    {' '}
                    <a onClick={() => this.editMeasuring(record.key)}>
                      <Icon type="edit" />
                    </a>
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => this.removeMeasuring(record.key)}
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
    const measuringList = await CategoryApi.getMeasurings(
      { page: 1, itemPerPage: 100000 },
      {}
    )
    var options = measuringList.data.map(d => (
      <Select.Option key={d.key} value={d.key}>
        {d.name}
      </Select.Option>
    ))
    this.setState({ measuringListSource: measuringList.data, measuringOps: options })
    if (this.props.initialValues)
      this.setState({
        measuringList: this.props.initialValues.measuringList,
        stationType: this.props.initialValues.objStationType,
        options: this.props.initialValues.options
      })
  }

  renderColumns(text, record, column) {
    return (
      <InputNumberCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    )
  }

  renderSelectColumns(text, record, column) {
    return (
      <AutoCompleteCell
        editable={record.editable}
        value={text}
        onChange={value =>
          this.handleChangeMeasuring(value, record.key, column)
        }
        options={this.state.measuringOps}
        autoFocus={true}
      />
    )
  }

  handleChangeMeasuring(value, key, column) {
    const newData = [...this.state.measuringList]
    const measuring = this.state.measuringListSource.filter(
      item => value === item.key
    )[0]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target.key = measuring.key
      target.name = measuring.name
      target.unit = measuring.unit
    }
    this.setState({ measuringList: newData })
  }

  handleChange(value, key, column) {
    const newData = [...this.state.measuringList]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target[column] = value
      this.setState({ measuringList: newData })
    }
  }

  editMeasuring(key) {
    const newData = [...this.state.measuringList]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target.editable = true
      this.setState({ measuringList: newData })
      this.cacheData = newData.map(item => ({ ...item }))
    }
  }

  saveMeasuring(key) {
    const newData = [...this.state.measuringList]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      delete target.editable
      this.setState({ measuringList: newData })
      this.cacheData = newData.map(item => ({ ...item }))
    }
  }

  removeMeasuring(key) {
    const newData = [...this.state.measuringList]
    const target = newData.filter(item => key !== item.key) || []
    if (target) {
      this.setState({ measuringList: target })
      this.cacheData = newData.map(item => ({ ...item }))
    }
  }

  cancelMeasuring(key) {
    const newData = [...this.state.measuringList]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      if (this.cacheData)
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        )
      delete target.editable
      this.setState({ measuringList: newData })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {
        key: values.key,
        name: values.name,
        mapLocation: { long: values.long, lat: values.lat },
        address: values.address,
        emails: values.emails,
        phones: values.phones,
        stationType: this.state.stationType,
        measuringList: this.state.measuringList,
        options: this.state.options
      }
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  changeStationType(stationType) {
    this.setState({ stationType: stationType })
  }

  handleAddRow() {
    const newRow = {
      key: '' + this.state.measuringList.length,
      name: '',
      unit: '',
      editable: true
    }
    let rows = this.state.measuringList.slice()
    rows = update(rows, { $push: [newRow] })
    this.setState({ measuringList: rows })
  }

  onSelect(record, selected, selectedRows) {
    this.edit(record.key)
  }

  onOptionChange(checkedValues) {
    this.setState({
      options: {
        ...this.state.options,
        [checkedValues.target.value]: checkedValues.target.checked
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.key.label')}>
              {getFieldDecorator('key', {
                rules: [
                  {
                    required: true,
                    message: t('stationManager.form.key.error')
                  }
                ]
              })(
                <Input
                  disabled={this.props.isEdit}
                  placeholder={t('stationAutoManager.form.key.placeholder')}
                />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.name.label')}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please enter value!' }]
              })(
                <Input
                  placeholder={t('stationAutoManager.form.name.placeholder')}
                />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.long.label')}>
              {getFieldDecorator('long', {
                rules: [{ required: true, message: 'please enter value!' }]
              })(
                <Input
                  placeholder={t('stationAutoManager.form.long.placeholder')}
                />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.lat.label')}>
              {getFieldDecorator('lat', {
                rules: [{ required: true, message: 'please enter value!' }]
              })(
                <Input
                  placeholder={t('stationAutoManager.form.lat.placeholder')}
                />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.address.label')}>
              {getFieldDecorator('address')(
                <Input
                  placeholder={t('stationAutoManager.form.address.placeholder')}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <SelectStationType
              getFieldDecorator={getFieldDecorator}
              label={t('stationAutoManager.form.stationType.label')}
              placeholder={t('stationAutoManager.form.stationType.placeholder')}
              onChangeStationType={this.changeStationType}
              value={
                this.props.initialValues
                  ? this.props.initialValues.stationType
                  : ''
              }
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.emails.label')}>
              {getFieldDecorator('emails')(
                <Select
                  mode="tags"
                  placeholder={t('stationAutoManager.form.emails.placeholder')}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.phones.label')}>
              {getFieldDecorator('phones')(
                <Select
                  mode="tags"
                  placeholder={t('stationAutoManager.form.phones.placeholder')}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24} />
        </Row>


        <Row>
          <Col span={8}><Checkbox value="isAllowWarning" onChange={this.onOptionChange} 
            checked={this.state.options.isAllowWarning}>{t('stationAutoManager.form.options.isAllowWarning')}</Checkbox></Col>
          <Col span={8}><Checkbox value="isAllowRemote" onChange={this.onOptionChange} 
            checked={this.state.options.isAllowRemote}>{t('stationAutoManager.form.options.isAllowRemote')}</Checkbox></Col>
        </Row>

        <Button
          style={{ width: '200px', right: '0' }}
          type="primary"
          onClick={this.handleAddRow}
        >
          add
        </Button>
        <Table
          rowKey={record => record.key}
          bordered
          dataSource={this.state.measuringList}
          columns={this.columns}
          rowSelection={{ onSelect: this.onSelect }}
        />
        <FormItem>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            {t('addon.save')}
          </Button>
        </FormItem>
      </Form>
    )
  }
}
