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
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
`
const Logo = styled.img`
  height: 70px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  display: block;
`
const Clearfix = styled.div`
  height: 24px;
`

function validate(values) {
  const errors = {}
  if (values.oldPassword === undefined || !values.oldPassword) {
    errors.oldPassword = translate('changePassword.form.oldPassword.error')
  }

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
  async handleLogin(values) {
    if (values.newPassword !== values.newPasswordConfirmation) {
      swal({
        title: translate('changePassword.form.newPasswordConfirmation.error1'),
        type: 'error'
      })
    } else {
      const auth = await AuthApi.getMe()
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPasswordConfirmation
      }
      const record = await AuthApi.changePassword(auth.data._id, data)
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
    return (
      <Container>
        <Logo src="/images/brand-logo.png" />
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
