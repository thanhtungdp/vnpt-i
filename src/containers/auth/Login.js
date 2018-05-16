import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connectAutoDispatch } from 'redux/connect'
import { reduxForm, Field } from 'redux-form'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { translate } from 'hoc/create-lang'
import slug from 'constants/slug'
import swal from 'sweetalert2'
import { withRouter } from 'react-router'
import Heading from 'components/elements/heading'
import createLang from 'hoc/create-lang'
import { InputLabel, createValidateComponent } from 'components/elements'
import Button from 'components/elements/button'
import Clearfix from 'components/elements/clearfix'
import { userLogin, userLogin2Factor } from 'redux/actions/authAction'
import Errors from 'constants/errors'

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
  { userLogin, userLogin2Factor }
)
export default class Login extends PureComponent {
  static propTypes = {
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    userLogin: PropTypes.func,
    userLogin2Factor: PropTypes.func
  }

  state = {
    formData: {},
    isTwoFactorAuth: false
  }

  userError(user) {
    let title = user.message
    if (user.message === Errors.USER_PASSWORD_INCORRECT) {
      title = translate('login.errors.emailOrPasswordIncorrect')
    } else if (user.message === Errors.ACCOUNT_DISABLE) {
      title = translate('login.errors.accountDisable')
    } else if (user.m === Errors.ACCOUNT_NOT_ACTIVATED) {
      title = translate('login.errors.accountNotActivated')
    } else if (user.message === Errors.CODE_NOT_EQUAL) {
      title = translate('login.errors.codeNotEqual')
    } else if (user.message === Errors.ORGANIZATION_NOT_EXIST) {
      title = translate('login.errors.organizationNotExist')
    }
    swal({
      title: title,
      type: 'error'
    })
  }

  userSuccess(user) {
    swal({
      type: 'success',
      text: 'Welcome ' + user.data.email
    })
    this.props.history.push('/')
  }

  async handleLogin(values) {
    if (!this.state.isTwoFactorAuth) {
      const user = await this.props.userLogin(values)
      if (user.error) {
        this.userError(user)
      } else {
        if (user.data.twoFactorAuth && user.data.twoFactorAuth.enable) {
          this.setState({
            isTwoFactorAuth: true,
            formData: values
          })
        } else {
          this.userSuccess(user)
        }
      }
    } else {
      const user = await this.props.userLogin2Factor(values)
      if (user.error) {
        this.userError(user)
      } else {
        this.userSuccess(user)
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
          {!this.state.isTwoFactorAuth ? (
            <div>
              <Field
                label={t('login.form.email.label')}
                placeholder={t('login.form.email.placeholder')}
                name="email"
                icon="fa fa-user"
                component={FInput}
              />
              <Clearfix height={16} />
              <Field
                label={t('login.form.password.label')}
                placeholder={t('login.form.password.placeholder')}
                type="password"
                name="password"
                component={FInput}
              />
            </div>
          ) : (
            <div>
              <p>
                {t('login.twoFactorAlert', {
                  email: this.state.formData.email
                })}
              </p>
              <Field
                label={t('login.form.twoFactor.label')}
                placeholder={t('login.form.twoFactor.placeholder')}
                name="code"
                component={FInput}
              />
            </div>
          )}
          <Clearfix height={16} />
          <Button isLoading={this.props.submitting} block color="primary">
            {!this.state.isTwoFactorAuth
              ? t('login.form.buttonLogin')
              : t('login.form.buttonTwoFactor')}
          </Button>
          <Clearfix height={16} />
          <FloatRight>
            <Link to={slug.password.emailConfirm}>
              {translate('resetPassword.key')}
            </Link>
          </FloatRight>
        </Form>
      </Container>
    )
  }
}
