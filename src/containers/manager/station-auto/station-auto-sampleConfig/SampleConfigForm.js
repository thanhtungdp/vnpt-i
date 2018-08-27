import React from 'react'
import axios from "axios"
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
import SamplingApi from 'api/SamplingApi'

const Option = Select.Option

const FormItem = Form.Item
@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class SampleConfigForm extends React.PureComponent {
  static propTypes = {
    lang: langPropTypes
  }

  constructor(props) {
    super(props)

    this.state = {
      isUpload: false,
      fileList: [],
      isSended: false
    }
  }

  async handleSubmit(e){
    e.preventDefault()
    this.setState({
      isUpload: true
    })
    try {
      const result = await SamplingApi.uploadSampleConfig(this.state.fileList)
      console.log(result)

      this.setState({
        isUpload: false
      })
    } catch (error) {
      this.setState({
        isUpload: false,
      })
    }
  }

  getPropsUpload(){
    return {
      name: 'file',
      headers: {
        authorization: 'authorization-text'
      },
      onRemove: (file) => {
       
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }))
        return false
      },
      fileList: this.state.fileList
    }
  }


  render() {
    const { t } = this.props.lang
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
        <Row gutter={20}>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label={t('support.form.upload.label')}
              // label={t('support.form.upload.label')}
            >
              <Upload
                {...this.getPropsUpload()}
              >
                <Button>
                  <Icon type="upload" disabled={this.state.isSended} />{' '}
                  {t('support.form.upload.buttonLabel')}
                </Button>
              </Upload>
            </FormItem>
          </Col>

          <Col span={8}>
             <FormItem
              {...formItemLayout}
              label={t('support.form.upload.label')}
              // label={t('support.form.upload.label')}
            >
              <Upload
                {...this.getPropsUpload()}
              >
                <Button>
                  <Icon type="upload" disabled={this.state.isSended} />{' '}
                  {t('support.form.upload.buttonLabel')}
                </Button>
              </Upload>
            </FormItem>
            </Col>

            <Col span={8}>
             <FormItem
              {...formItemLayout}
              label={t('support.form.upload.label')}
              // label={t('support.form.upload.label')}
            >
              <Upload
                {...this.getPropsUpload()}
              >
                <Button disabled={true}>
                  <Icon type="upload" disabled={this.state.isSended} />{' '}
                  {t('support.form.upload.buttonLabel')}
                </Button>
              </Upload>
            </FormItem>
            </Col>
        </Row>
        
        <Row gutter={0}>
          <Col span={24}>
            <FormItem {...tailFormItemLayout}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                loading={this.state.isUpload}
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
