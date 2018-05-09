import React from 'react'
import { Form, Input, Button, Row, Col, Checkbox, Icon } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import SelectIcon from 'components/elements/select-icon-station-type'
import InputNumberCell from 'components/elements/input-number-cell'

const FormItem = Form.Item
@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationTypeForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    lang: langPropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      urlIcon: '',
      color: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {
        key: values.key,
        name: values.name,
        isAuto: values.isAuto,
        icon: this.state.urlIcon,
        color: this.state.color,
        numericalOrder: values.numericalOrder
      }
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  renderButtonUpload(name) {
    return (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{name}</div>
      </div>
    )
  }

  async componentWillMount() {
    if (this.props.initialValues) {
      let updateState = {}
      if (this.props.initialValues.icon && this.props.initialValues.icon !== '')
        updateState.urlIcon = this.props.initialValues.icon
      if (this.props.initialValues.color)
        updateState.color = this.props.initialValues.color
      this.setState(updateState)
    }
  }

  onChangeIcon(iconObject) {
    this.setState({
      urlIcon: iconObject.urlIcon,
      color: iconObject.color
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    const formItemLayout = {
      labelCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 2, offset: 0 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.key.label')}>
              {getFieldDecorator('key', {
                rules: [
                  {
                    required: true,
                    message: t('stationTypeManage.form.key.error')
                  }
                ]
              })(
                <Input placeholder={t('stationTypeManager.form.key.label')} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.name.label')}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: t('stationTypeManage.form.name.error')
                  }
                ]
              })(
                <Input placeholder={t('stationTypeManager.form.name.label')} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={t('stationTypeManager.form.icon.label')}
            >
              <SelectIcon
                initialValues={this.state}
                onChangeValue={this.onChangeIcon}
              />
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              {getFieldDecorator('isAuto', {
                valuePropName: 'checked'
              })(
                <Checkbox>{t('stationTypeManager.form.auto.label')}</Checkbox>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              labelCol={{ span: 12 }}
              label={t('stationTypeManager.form.numericalOrder.label')}
            >
              {getFieldDecorator('numericalOrder', {
                rules: [{ required: true }]
              })(<InputNumberCell editable={true} />)}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          {t('addon.save')}
          </Button>
        </FormItem>
      </Form>
    )
  }
}
