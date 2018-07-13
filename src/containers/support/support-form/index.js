import React from 'react'
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Icon,
  Select,
  Upload,
  message
} from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import SupportApi from 'api/SupportApi'

const Option = Select.Option

const FormItem = Form.Item
@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class SupportForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    lang: langPropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      type: [],
      fileList: [],
      isSended: false
    }
  }

  handelSended() {
    this.setState({ isSended: true })
  }

  async componentWillMount() {
    const res = await SupportApi.getType()
    if (res.success)
      this.setState({
        type: res.data
      })
  }

  async handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) return
      this.setState({
        isLoading: true
      })
      const data = {
        type: values.type,
        title: values.title,
        content: values.content,
        attachments: this.state.fileList.map(item => {
          return {
            path: item.response.file.path,
            originalname: item.name
          }
        })
      }
      // Callback submit form Container Component
      await this.props.onSubmit(data, this.handelSended)
      this.setState({
        isLoading: false
      })
    })
  }

  onChange(info) {
    if (info.file.status !== 'uploading') {
    }

    if (info.file.status === 'done') {
      this.setState({ fileList: info.fileList })
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }

    if (info.file.status === 'removed') {
      this.setState({ fileList: info.fileList })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    const propsUpload = {
      name: 'file',
      action: SupportApi.getUploadUrl(),
      headers: {
        authorization: 'authorization-text'
      }
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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
          offset: 8
        }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label={t('support.form.type.label')}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: t('support.form.type.error')
                  }
                ]
              })(
                <Select style={{ width: 120 }} disabled={this.state.isSended}>
                  {this.state.type.map(item => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label={t('support.form.title.label')}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: t('support.form.title.error')
                  }
                ]
              })(<Input disabled={this.state.isSended} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={t('support.form.content.label')}
            >
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: t('support.form.content.error')
                  }
                ]
              })(<Input.TextArea rows={8} disabled={this.state.isSended} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={t('support.form.upload.label')}
            >
              <Upload
                {...propsUpload}
                onChange={this.onChange}
                disabled={this.state.isSended}
              >
                <Button>
                  <Icon type="upload" disabled={this.state.isSended} />{' '}
                  {t('support.form.upload.buttonLabel')}
                </Button>
              </Upload>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...tailFormItemLayout}>
              <Button
                style={{ width: 200 }}
                type="primary"
                htmlType="submit"
                loading={this.state.isLoading}
                disabled={this.state.isSended}
              >
                {t('addon.sendRequest')}
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
