import React from 'react'
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Table,
  Checkbox,
  Popconfirm,
  Icon
} from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
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
    lang: langPropTypes,
    measuringListSource: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
      cameraList: [{ key: 0 }],
      count: 0
    }
    const { t } = this.props.lang
    const { getFieldDecorator } = this.props.form
    this.columns = [
      {
        dataIndex: 'name',
        title: t('stationAutoManager.options.name.label'),
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator(`list[${index}].name`, {
              initialValue: record.name,
              rules: [
                {
                  required: true,
                  message:
                    'Please enter ' + t('stationAutoManager.options.name.label')
                }
              ]
            })(
              <Input placeholder={t('stationAutoManager.options.name.label')} />
            )}
          </FormItem>
        )
      },
      {
        dataIndex: 'rtspUrl',
        title: t('stationAutoManager.options.RTSP.label'),
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator(`list[${index}].rtspUrl`, {
              initialValue: record.rtspUrl,
              rules: [
                {
                  required: true,
                  message:
                    'Please enter ' + t('stationAutoManager.options.RTSP.label')
                }
              ]
            })(
              <Input placeholder={t('stationAutoManager.options.RTSP.label')} />
            )}
          </FormItem>
        )
      },
      {
        dataIndex: 'key',
        title: 'Action',
        render: (text, record, index) => {
          return (
            <div className="editable-row-operations">
              {index !== 0 && (
                <span>
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => this.removeCamera(index)}
                  >
                    <a>
                      <Icon
                        type="delete"
                        style={{ verticalAlign: '5px', color: 'red' }}
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

  removeCamera(index) {
    /* eslint-disable */
    this.state.cameraList = this.props.form.getFieldValue('list')
    this.state.count = 0
    this.state.cameraList.splice(index, 1)

    this.props.form.setFieldsValue({
      list: this.state.cameraList
    })
    this.state.cameraList = this.state.cameraList.map((item, index) => {
      item.key = index
      return item
    })
    this.forceUpdate()
  }

  async componentWillMount() {
    if (
      this.props.initialValues &&
      this.props.initialValues.camera &&
      this.props.initialValues.camera.allowed
    )
      this.setState({
        cameraList: this.props.initialValues.camera.list.map(item => {
          item.key = this.state.count++
          return item
        }),
        count: this.state.count
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {
        warning: {
          allowed: values.allowSendWarning ? values.allowSendWarning : false
        },
        sampling: {
          allowed: values.allowSendWarning ? values.allowSendWarning : false,
          apiAddress: values.apiAddress
        },
        camera: {
          allowed: values.allowCamera ? values.allowCamera : false,
          list: values.list ? values.list : []
        }
      }
      if (!data.sampling.allowed) delete data.sampling.apiAddress
      if (!data.camera.allowed) delete data.camera.list
      // Callback submit form Container Component
      //this.props.onSubmit(data)
    })
  }

  addCamera() {
    this.setState({
      cameraList: [
        ...this.state.cameraList,
        { key: this.state.cameraList.length }
      ]
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      style: {
        //marginBottom: '2px'
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 4
        }
      }
    }

    const styleFormItem = {
      style: {
        marginBottom: 0
      }
    }

    const { t } = this.props.lang
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={2}>
          <Col span={12}>
            <FormItem {...styleFormItem}>
              {getFieldDecorator('allowSendWarning', {
                valuePropName: 'checked',
                initialValue: this.props.initialValues.warning
                  ? this.props.initialValues.warning.allowed
                  : false
              })(
                <Checkbox>
                  {t('stationAutoManager.options.allowSendWarning.label')}
                </Checkbox>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col span={12}>
            <FormItem {...styleFormItem}>
              {getFieldDecorator('allowSampling', {
                valuePropName: 'checked',
                initialValue: this.props.initialValues.sampling
                  ? this.props.initialValues.sampling.allowed
                  : false
              })(
                <Checkbox>
                  {t('stationAutoManager.options.allowSampling.label')}
                </Checkbox>
              )}
            </FormItem>
            {this.props.form.getFieldValue('allowSampling') && (
              <FormItem
                {...formItemLayout}
                {...styleFormItem}
                label={t('stationAutoManager.options.apiAddress.label')}
              >
                {getFieldDecorator('apiAddress', {
                  initialValue: this.props.initialValues.sampling
                    ? this.props.initialValues.sampling.apiAddress
                    : ''
                })(
                  <Input
                    placeholder={t(
                      'stationAutoManager.config.apiAddress.placeholder'
                    )}
                  />
                )}
              </FormItem>
            )}
          </Col>
        </Row>

        <Row gutter={2}>
          <Col span={12}>
            <FormItem {...formItemLayout} {...styleFormItem}>
              {getFieldDecorator('allowCamera', {
                valuePropName: 'checked',
                initialValue: this.props.initialValues.camera
                  ? this.props.initialValues.camera.allowed
                  : false
              })(
                <Checkbox>
                  {t('stationAutoManager.options.allowCamera.label')}
                </Checkbox>
              )}
            </FormItem>
          </Col>
        </Row>

        {this.props.form.getFieldValue('allowCamera') && (
          <div>
            <Row gutter={2}>
              <Col span={12}>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" onClick={this.addCamera}>
                    Add
                  </Button>
                </FormItem>
              </Col>
            </Row>

            <Row gutter={2}>
              <Col span={22}>
                <FormItem {...tailFormItemLayout} wrapperCol={{ offset: 2 }}>
                  <Table
                    rowKey={record => record.key}
                    bordered
                    dataSource={this.state.cameraList}
                    columns={this.columns}
                    pagination={{
                      pageSize: 1000,
                      hideOnSinglePage: true
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
          </div>
        )}
        {/* <FormItem>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                        {t('addon.save')}
                    </Button>
                </FormItem> */}
      </Form>
    )
  }
}
