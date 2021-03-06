import React from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles'
import createLanguage, { langPropTypes } from 'hoc/create-lang'

require('../user-search-form/index.css')

const FormItem = Form.Item

@Form.create({
  mapPropsToFields: ({ initialValues }) => {
    if (!initialValues) return
    if (initialValues.phone) {
      initialValues.phone = initialValues.phone.phoneNumber
    }
    return mapPropsToFields({ initialValues })
  }
})
@createLanguage
@autobind
export default class UserForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    lang: langPropTypes,
    isEdit: PropTypes.bool,
    initialValues: PropTypes.object,
    isLoading: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      selectOrganizations: [],
      phone: {}
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (err) return
      const data = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: this.state.phone,
        organization: values.organization
          ? this.state.selectOrganizations.find(
              item => item._id === values.organization
            )
          : null
      }
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { lang: { t } } = this.props
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback(t('changePassword.form.compare'))
    } else {
      callback()
    }
  }
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  handleTelChange(telNumber, selectedCountry) {
    this.setState({
      phone: {
        phoneNumber: telNumber,
        ...selectedCountry
      }
    })
  }

  async componentWillMount() {}

  render() {
    const { form: { getFieldDecorator }, lang: { t } } = this.props
    const formItemLayout = {
      labelCol: {
        sm: { span: 7, offset: 0 }
      },
      wrapperCol: {
        sm: { span: 17, offset: 0 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={t('userManager.form.email.label')}
            >
              {getFieldDecorator('email', {
                initialValue: this.props.initialValues
                  ? this.props.initialValues.email
                  : null,
                rules: [
                  {
                    type: 'email',
                    message: t('userManager.form.email.error')
                  },
                  {
                    required: true,
                    message: t('userManager.form.email.label')
                  }
                ]
              })(
                <Input
                  disabled={this.props.isEdit}
                  placeholder={t('userManager.form.email.label')}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={t('userManager.form.phone.label')}
            >
              {getFieldDecorator(`phone`, {
                rules: [
                  {
                    required: true,
                    message: t('userManager.form.phone.label')
                  }
                ]
              })(
                <ReactTelephoneInput
                  defaultCountry="vn"
                  flagsImagePath={
                    !this.props.isEdit
                      ? '../images/flags.png'
                      : '../../images/flags.png'
                  }
                  onChange={this.handleTelChange}
                />
              )}
            </FormItem>
          </Col>
        </Row>

        {!this.props.isEdit && (
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label={t('userManager.form.password.label')}
              >
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: t('userManager.form.password.label')
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(
                  <Input
                    type="password"
                    disabled={this.props.isEdit}
                    placeholder={t('userManager.form.password.placeholder')}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label={t('userManager.form.confirmPassword.label')}
              >
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    {
                      required: true,
                      message: t('userManager.form.confirmPassword.message')
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input
                    type="password"
                    placeholder={t('userManager.form.confirmPassword.label')}
                    onBlur={this.handleConfirmBlur}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={t('userManager.form.firstName.label')}
            >
              {getFieldDecorator('firstName', {
                initialValue: this.props.initialValues
                  ? this.props.initialValues.firstName
                  : null,
                rules: [
                  {
                    required: true,
                    message: t('userManager.form.firstName.label')
                  }
                ]
              })(
                <Input
                  placeholder={t('userManager.form.firstName.placeholder')}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={t('userManager.form.lastName.label')}
            >
              {getFieldDecorator('lastName', {
                initialValue: this.props.initialValues
                  ? this.props.initialValues.lastName
                  : null,
                rules: [
                  {
                    required: true,
                    message: t('userManager.form.lastName.label')
                  }
                ]
              })(<Input placeholder={t('userManager.form.lastName.label')} />)}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            loading={this.props.isLoading}
          >
            {t('addon.save')}
          </Button>
        </FormItem>
      </Form>
    )
  }
}
