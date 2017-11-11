import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Container, Button } from 'reactstrap'
import swal from 'sweetalert2'
import { withRouter } from 'react-router'
import { InputLabel, createValidateComponent } from '../../components/elements'
import Header from '../../components/layouts/Header'
import { userLogin } from '../../redux/actions/authAction'

const FInput = createValidateComponent(InputLabel)

const Form = styled.form`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
`

const Logo = styled.img`
  height: 80px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  display: block;
`

const Clearfix = styled.div`
  height: 24px;
`

class Login extends PureComponent {
  async handleLogin(values) {
    if (values.email) {
      const user = await this.props.userLogin()
      const context = this
      swal({
        title: 'Chào mừng ' + user.fullname
      }).then(() => {
        context.props.router.push('/dashboard')
      })
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Logo src="/logo.png" />
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
          <Button size="lg" block color="primary">
            Đăng nhập
          </Button>
        </Form>
      </Container>
    )
  }
}
Login.propTypes = {
	userLogin: PropTypes.func,
	isAuthenticated: PropTypes.bool,
	userInfo: PropTypes.shape({
		username: PropTypes.string,
		fullname: PropTypes.string
	})
}

const formConnect = reduxForm({
  form: 'LoginForm'
})(Login)

export default withRouter(
  connect(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      userInfo: state.auth.userInfo
    }),
    dispatch => bindActionCreators({ userLogin }, dispatch)
  )(formConnect)
)
