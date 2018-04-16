import React from 'react'
import { Form as FormStyle, Input, Button, Row, Col, Icon } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles'
import styled from 'styled-components'
// import { getOrganizations } from 'api/OrganizationApi'

require('./index.css')

const FormItem = FormStyle.Item
const Form = styled(FormStyle)`
  display: flex;
  align-items: flex-end;
  .ant-form-item-control {
    line-height: 0px;
  }
  .ant-form-item {
    margin-bottom: 0px;
    max-width: 140px;
  }
`
const Clearfix = styled.div`
  width: 8px;
`

@FormStyle.create({
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
    const formItemLayout = {
      // wrapperCol: {
      //   xs: { span: 16 },
      //   sm: { span: 16 },
      // },
    }

    return (
      <Form className="fadeIn animated" onSubmit={this.changeSearch}>
        <FormItem {...formItemLayout}>
          {getFieldDecorator(`email`)(
            <Input placeholder={t('userSearchFrom.form.email.placeholder')} />
          )}
        </FormItem>
        <Clearfix />
        <FormItem {...formItemLayout}>
          {getFieldDecorator(`firstName`)(
            <Input
              placeholder={t('userSearchFrom.form.firstName.placeholder')}
            />
          )}
        </FormItem>
        <Clearfix />
        <FormItem {...formItemLayout}>
          {getFieldDecorator(`lastName`)(
            <Input
              placeholder={t('userSearchFrom.form.lastName.placeholder')}
            />
          )}
        </FormItem>
        <Clearfix />
        <FormItem {...formItemLayout}>
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
        <Clearfix />
        <Button shape="circle" htmlType="submit">
          <Icon type="search" />
        </Button>
      </Form>
    )
  }
}
