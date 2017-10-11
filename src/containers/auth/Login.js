import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'
import { InputLabel, createInputValidate } from '../../components/elements'

const FInput = createInputValidate(InputLabel)

const LoginContainer = styled.div``

@reduxForm({
  form: 'LoginForm'
})
export default class Login extends PureComponent {
  static propTypes = {}
  render() {
    return (
      <LoginContainer>
        <FInput name="username" />
      </LoginContainer>
    )
  }
}
