import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connectAutoDispatch } from 'redux/connect'
import { reduxForm, Field } from 'redux-form'
import { Container } from 'reactstrap'
import swal from 'sweetalert2'
import { withRouter } from 'react-router'
import { InputLabel, createValidateComponent } from 'components/elements'
import Button from 'components/elements/button'
import { userLogin } from 'redux/actions/authAction'

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

@withRouter
@reduxForm({
  form: 'LoginForm'
})
@connectAutoDispatch(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.auth.userInfo
  }),
  { userLogin }
)
export default class Login extends PureComponent {
  static propTypes = {
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    userLogin: PropTypes.func
  }

  async handleLogin(values) {
    if (values.email) {
      const user = await this.props.userLogin(values)
      this.props.history.push('/')
      if (user.error) {
        swal({
          title: user.message,
          type: 'error'
        })
      } else {
        swal({
          type: 'success',
          text: 'Chào mừng ' + user.data.email
        })
      }
    }
  }

  render() {
    return (
      <Container>
        <Logo src="/images/brand-logo.png" />
        <Form onSubmit={this.props.handleSubmit(this.handleLogin.bind(this))}>
          <Field
            label="Email"
            placeholder="Email đăng nhập"
            name="email"
            icon="fa fa-user"
            component={FInput}
            size="lg"
          />
          <Clearfix />
          <Field
            label="Password"
            type="password"
            name="password"
            component={FInput}
            size="lg"
          />
          <Clearfix />
          <Button
            isLoading={this.props.submitting}
            size="lg"
            block
            color="primary"
          >
            Đăng nhập
          </Button>
        </Form>
      </Container>
    )
  }
}
