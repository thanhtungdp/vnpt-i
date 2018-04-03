import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form'
import { Container } from 'reactstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'
import { translate } from 'hoc/create-lang'
import { InputLabel, createValidateComponent } from 'components/elements'
import Button from 'components/elements/button'
import Heading from 'components/elements/heading'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import AuthApi from 'api/AuthApi'

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

const Note = styled.p`
  font-style: italic;
  padding: 8px 0px 8px 0px;
`

function validate(values) {
  const errors = {}
  if (values.code === undefined || !values.code) {
    errors.code = translate('error.require')
  }
  return errors
}

@withRouter
@reduxForm({
  form: 'CodeConfirmForm',
  validate
})
@autobind
export default class CodeConfirm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {}
    }
  }

  async handleResendCode() {
    const email = this.props.match.params.key
    const record = await AuthApi.GetForgotSendCode(email)
    if (record.error) {
      swal({
        type: 'error',
        title: record.message
      })
    } else {
      swal({
        type: 'success',
        title: ''
      })
    }
  }

  async handleConfirm(values) {
    const data = {
      email: this.props.match.params.key,
      code: values.code
    }
    const record = await AuthApi.PostConfirmCode(data)
    if (record.error) {
      swal({
        type: 'error',
        title: record.message
      })
    } else {
      this.props.history.push(slug.user.resetPassword, record)
    }
  }

  render() {
    return (
      <Container>
        <style dangerouslySetInnerHTML={{ __html: bodyStyle }} />
        <Form onSubmit={this.props.handleSubmit(this.handleConfirm.bind(this))}>
          <Header.Wrapper>
            <Heading fontSize={28}>{''}</Heading>
            <Header.Logo src="/images/logo/logo-text-enviro.png" />
          </Header.Wrapper>
          <Field
            label="Enter code"
            placeholder="Code confirm"
            name="code"
            icon="fa fa-user"
            component={FInput}
            size="small"
          />
          <Clearfix />
          <Button
            isLoading={this.props.submitting}
            disabled={this.props.submitting}
            size="small"
            type="primary"
            block
            color="primary"
          >
            {translate('resetPassword.key5')}
          </Button>
          <Clearfix />
          <FloatRight>
            <Link
              to={this.props.location.pathname}
              onClick={this.handleResendCode}
            >
              {translate('resetPassword.key4')}
            </Link>
          </FloatRight>
        </Form>
      </Container>
    )
  }
}
