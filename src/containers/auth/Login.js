import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connectAutoDispatch } from 'redux/connect'
import { reduxForm, Field } from 'redux-form'
import { Container } from 'reactstrap'
import swal from 'sweetalert2'
import { withRouter } from 'react-router'
import Heading from 'components/elements/heading'
import createLang from 'hoc/create-lang'
import { InputLabel, createValidateComponent } from 'components/elements'
import Button from 'components/elements/button'
import Clearfix from 'components/elements/clearfix'
import { userLogin } from 'redux/actions/authAction'

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

const bodyStyle = `
  body { background: linear-gradient(135deg,#1d89ce 0%,#56d2f3 100%) !important; }
`

@createLang
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
      if (user.error) {
        swal({
          title: user.message,
          type: 'error'
        })
      } else {
        this.props.history.push('/')
        swal({
          type: 'success',
          text: 'Chào mừng ' + user.data.email
        })
      }
    }
  }

  render() {
    const { t } = this.props.lang
    return (
      <Container>
        <style dangerouslySetInnerHTML={{ __html: bodyStyle }} />
        <Form onSubmit={this.props.handleSubmit(this.handleLogin.bind(this))}>
          <Header.Wrapper>
            <Heading fontSize={28}>{t('login.title')}</Heading>
            <Header.Logo src="/images/logo/logo-text-enviro.png" />
          </Header.Wrapper>
          <Clearfix height={8} />
          <Field
            label={t('login.form.email.label')}
            placeholder={t('login.form.email.placeholder')}
            name="email"
            icon="fa fa-user"
            component={FInput}
          />
          <FloatRight>
            <Link to={slug.user.emailConfirm}>
              {translate('resetPassword.key')}
            </Link>
          </FloatRight>
          <Clearfix height={16} />
          <Field
            label={t('login.form.password.label')}
            placeholder={t('login.form.password.placeholder')}
            type="password"
            name="password"
            component={FInput}
          />
          <Clearfix height={16} />
          <Button isLoading={this.props.submitting} block color="primary">
            {t('login.form.buttonLogin')}
          </Button>
        </Form>
      </Container>
    )
  }
}
