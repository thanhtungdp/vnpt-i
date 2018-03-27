import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form'
import swal from 'sweetalert2'
import { withRouter } from 'react-router'
import { Container } from 'reactstrap'
import { InputLabel, createValidateComponent } from 'components/elements'
import Button from 'components/elements/button'
import AuthApi from 'api/AuthApi'
import { translate } from 'hoc/create-lang'
import { autobind } from 'core-decorators'

const FInput = createValidateComponent(InputLabel)

const Form = styled.form`
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  box-shadow: 0 2px 10px 0 rgba(238, 238, 238, 0.5);
  background-color: #ffffff;
  padding: 24px 32px;
`

const FloatRight = styled.div`
  text-align: right;
  padding-top: 8px;
`

const Header = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Logo: styled.img`
    height: 36px;
    width: auto;
  `
}

const Clearfix = styled.div`
  height: 16px;
`

const bodyStyle = `
  body { background: linear-gradient(135deg,#1d89ce 0%,#56d2f3 100%) !important; }
`

function validate(values) {
  const errors = {}
  if (values.newPassword === undefined || !values.newPassword) {
    errors.newPassword = translate('changePassword.form.newPassword.error')
  }

  if (
    values.newPasswordConfirmation === undefined ||
    !values.newPasswordConfirmation
  ) {
    errors.newPasswordConfirmation = translate(
      'changePassword.form.newPasswordConfirmation.error'
    )
  }
  return errors
}

@reduxForm({
  form: 'ResetPasswordForm',
  validate
})
@withRouter
@autobind
export default class ResetPassword extends PureComponent {

  constructor(props){
    super(props)
    this.state = {
      userInfo: {}
    }
  }

  async componentWillMount(){
    this.setState({
      userInfo: this.props.history.location.state.data
    })
  }

  async handleLogin(values) {

    console.log(this.state.userInfo,"user Data")
    if (values.newPassword !== values.newPasswordConfirmation) {
      swal({
        title: translate('changePassword.form.newPasswordConfirmation.error1'),
        type: 'error'
      })
    } else {
      const data = {
        _id: this.state.userInfo._id,
        password: values.newPasswordConfirmation
      }
      const record = await AuthApi.PutResetPassword(data._id , data)
      if (record.error) {
        swal({
          type: 'error',
          title: record.message
        })
      } else {
        swal({
          type: 'success',
          title: translate('changePassword.form.Success')
        })
        this.props.push('/')
      }
    }
  }

  render() {
    {console.log(this.props,"render()")}
    return (
      <Container>
        <style dangerouslySetInnerHTML={{ __html: bodyStyle }} />
        <Form onSubmit={this.props.handleSubmit(this.handleLogin.bind(this))}>
          <Field
            label="New password"
            type="password"
            placeholder="New password"
            name="newPassword"
            component={FInput}
            size="small"
          />
          <Clearfix />
          <Field
            label="Password confirmation"
            type="password"
            placeholder="Password confirmation"
            name="newPasswordConfirmation"
            component={FInput}
            size="small"
          />
          <Clearfix />
          <Button
            isLoading={this.props.submitting}
            size="lg"
            block
            color="primary"
          >
            Save password
          </Button>
        </Form>
      </Container>
    )
  }
}
