import React from 'react'
import { Form, Input, Row, Col, Table, InputNumber } from 'antd'
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
      measuringList: []
    }
    const { t } = this.props.lang
    const { getFieldDecorator } = this.props.form
    const styleFormItem = {
      style: {
        marginBottom: 0
      }
    }
    this.columns = [
      {
        dataIndex: 'key',
        title: t('stationAutoManager.config.measuringDes.label'),
        render: (text, record, index) => (
          <FormItem {...styleFormItem}>
            {getFieldDecorator(`measuringList[${index}].measuringDes`, {
              initialValue: text,
              rules: [
                {
                  message:
                    'Please enter ' +
                    t('stationAutoManager.config.measuringDes.label')
                }
              ]
            })(<span>{text}</span>)}
          </FormItem>
        )
      },
      {
        dataIndex: 'measuringSrc',
        title: t('stationAutoManager.config.measuringSrc.label'),
        render: (text, record, index) => (
          <FormItem {...styleFormItem}>
            {getFieldDecorator(`measuringList[${index}].measuringSrc`, {
              initialValue: this.initialValueMeasuringSrc(record.key),
              rules: [
                {
                  message:
                    'Please enter ' +
                    t('stationAutoManager.config.measuringSrc.label')
                }
              ]
            })(
              <Input
                placeholder={t(
                  'stationAutoManager.config.measuringDes.placeholder'
                )}
              />
            )}
          </FormItem>
        )
      },
      {
        dataIndex: 'ratio',
        title: t('stationAutoManager.config.ratio.label'),
        render: (text, record, index) => (
          <FormItem {...styleFormItem}>
            {getFieldDecorator(`measuringList[${index}].ratio`, {
              initialValue: this.initialValueRatio(record.key),
              rules: [
                {
                  required: true,
                  message:
                    'Please enter ' + t('stationAutoManager.config.ratio.label')
                }
              ]
            })(<InputNumber min={1} />)}
          </FormItem>
        )
      }
    ]
  }

  initialValueMeasuringSrc(measuringDes) {
    let res = this.props.initialValues.measuringList.find(
      item => item.measuringDes === measuringDes
    )
    return res ? res.measuringSrc : ''
  }

  initialValueRatio(measuringDes) {
    let res = this.props.initialValues.measuringList.find(
      item => item.measuringDes === measuringDes
    )
    return res ? res.ratio : 1
  }

  async componentWillMount() {}

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {
        fileName: values.fileName,
        path: values.path,
        measuringList: values.measuringList.filter(
          item => item.measuringDes && item.measuringDes !== ''
        )
      }
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    const formItemLayout = {
      labelCol: {
        sm: { span: 4, offset: 0 },
      },
      wrapperCol: {
        sm: { span: 19, offset: 0 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem {...formItemLayout} label={t('stationAutoManager.config.fileName.label')}>
              {getFieldDecorator('fileName', {
                initialValue: this.props.initialValues
                  ? this.props.initialValues.fileName
                  : '',
                rules: [
                  {
                    required: true,
                    message: t('stationAutoManager.config.fileName.label')
                  }
                ]
              })(
                <Input
                  //disabled={this.props.isEdit}
                  placeholder={t(
                    'stationAutoManager.config.fileName.placeholder'
                  )}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label={t('stationAutoManager.config.path.label')}>
              {getFieldDecorator('path', {
                initialValue: this.props.initialValues
                  ? this.props.initialValues.path
                  : '',
                rules: [
                  {
                    required: true,
                    message:
                      'Please enter ' +
                      t('stationAutoManager.config.path.label')
                  }
                ]
              })(
                <Input
                  placeholder={t('stationAutoManager.config.path.placeholder')}
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <Table
          rowKey={record => record.key}
          bordered
          dataSource={
            this.props.measuringListSource && this.props.measuringListSource
          }
          columns={this.columns}
          pagination={{
            pageSize: 1000,
            hideOnSinglePage: true
          }}
        />
        {/* <FormItem>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            {t('addon.save')}
          </Button>
        </FormItem> */}
      </Form>
    )
  }
}
