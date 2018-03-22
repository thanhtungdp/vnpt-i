import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form'
import swal from 'sweetalert2'
import { withRouter } from 'react-router'
import { InputLabel, createValidateComponent } from 'components/elements'
import Button from 'components/elements/button'
import AuthApi from 'api/AuthApi'
import { translate } from 'hoc/create-lang'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { autobind } from 'core-decorators'
import Breadcrumb from 'containers/auth/breadcrumb'

const FInput = createValidateComponent(InputLabel)

const Form = styled.form``

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
  form: 'ChangePasswordForm',
  validate
})
@withRouter
@autobind
export default class ChangePassword extends PureComponent {
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
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb items={['changePassword']} />
        <Form onSubmit={this.props.handleSubmit(this.handleLogin.bind(this))}>
          <Field
            label="Current password"
            placeholder="Current password"
            name="oldPassword"
            type="password"
            icon="fa fa-user"
            component={FInput}
            size="small"
          />
          <Clearfix />
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
      </PageContainer>
    )
  }
}
