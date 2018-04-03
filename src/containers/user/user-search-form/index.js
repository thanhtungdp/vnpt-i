import React from 'react'
import { Form, Input, Button, Row, Col, Icon } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles'
// import { getOrganizations } from 'api/OrganizationApi'

require('./index.css')

const FormItem = Form.Item

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguage
@autobind
export default class UserSearchForm extends React.PureComponent {
  static propTypes = {
    initialValues: PropTypes.object,
    onChangeSearch: PropTypes.func,
    lang: langPropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSearch: {},
      phone: {}
    }
  }

  async componentWillMount() {}

  changeSearch(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const dataSearch = {}
      if (values.email) dataSearch.email = values.email
      if (values.firstName) dataSearch.firstName = values.firstName
      if (values.lastName) dataSearch.lastName = values.lastName
      if (this.state.phone) {
        dataSearch.country = this.state.phone
        dataSearch.phone =
          this.state.phone.phoneNumber !== '+'
            ? this.state.phone.phoneNumber
            : ''
      }
      // Callback submit form Container Component
      this.setState({ dataSearch: dataSearch }, () =>
        this.props.onChangeSearch(dataSearch)
      )
    })
  }

  handleInputChange(telNumber, selectedCountry) {
    this.setState({
      phone: {
        phoneNumber: telNumber,
        ...selectedCountry
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { lang: { t } } = this.props

    return (
      <Form className="ant-advanced-search-form" onSubmit={this.changeSearch}>
        <Row gutter={24}>
          <Col span={8} key="email">
            <FormItem label={t('userSearchFrom.form.email.label')}>
              {getFieldDecorator(`email`)(
                <Input
                  placeholder={t('userSearchFrom.form.email.placeholder')}
                />
              )}
            </FormItem>
          </Col>

          <Col span={8} key="firstName">
            <FormItem label={t('userSearchFrom.form.firstName.label')}>
              {getFieldDecorator(`firstName`)(
                <Input
                  placeholder={t('userSearchFrom.form.firstName.placeholder')}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8} key="lastName">
            <FormItem label={t('userSearchFrom.form.lastName.label')}>
              {getFieldDecorator(`lastName`)(
                <Input
                  placeholder={t('userSearchFrom.form.lastName.placeholder')}
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12} key="country">
            <FormItem label={t('userSearchFrom.form.phone.label')}>
              {getFieldDecorator(`phone`, {
                initialValue: this.props.initialValues.type,
                rules: [
                  {
                    //required: true,
                    message: t('userSearchFrom.form.phone.label')
                  }
                ]
              })(
                <ReactTelephoneInput
                  defaultCountry="vn"
                  flagsImagePath="./images/flags.png"
                  onChange={this.handleInputChange}
                  // onBlur={this.handleInputBlur}
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24} style={{ textAlign: 'right', marginBottom: '24px' }}>
            <Button type="primary" htmlType="submit">
              <Icon type="search" />
              {t('addon.search')}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
