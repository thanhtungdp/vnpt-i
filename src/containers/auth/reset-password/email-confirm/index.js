import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form'
import swal from 'sweetalert2'
import { Container } from 'reactstrap'
import { withRouter } from 'react-router'
import { translate } from 'hoc/create-lang'
import { InputLabel, createValidateComponent } from 'components/elements'
import Button from 'components/elements/button'
import Heading from 'components/elements/heading'
import { autobind } from 'core-decorators'
import AuthApi from 'api/AuthApi'
import slug from 'constants/slug'

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

const Note = styled.p`
  font-style: italic;
  padding: 8px 0px 8px 0px;
`

const bodyStyle = `
  body { background: linear-gradient(135deg,#1d89ce 0%,#56d2f3 100%) !important; }
`

function validate(values) {
  const errors = {}
  if (values.email === undefined || !values.email) {
    errors.email = translate('error.require')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = translate('error.email')
  }
  return errors
}

@reduxForm({
  form: 'EmailConfirmForm',
  validate
})
@withRouter
@autobind
export default class EmailConfirm extends PureComponent {
  async handleResetPassword(values) {
    const email = values.email
    const record = await AuthApi.getForgotSendCode(email)
    if (record.error) {
      swal({
        type: 'error',
        title: record.message
      })
    } else {
      this.props.history.push(`${slug.password.codeConfirmWithKey}/${email}`)
    }
  }

  render() {
    return (
      <Container>
        <style dangerouslySetInnerHTML={{ __html: bodyStyle }} />
        <Form
          onSubmit={this.props.handleSubmit(
            this.handleResetPassword.bind(this)
          )}
        >
          <Header.Wrapper>
            <Heading fontSize={28}>{''}</Heading>
            <Header.Logo src="/images/logo/logo-text-enviro.png" />
          </Header.Wrapper>
          <Field
            label="Email confirm"
            placeholder="Email confirm"
            name="email"
            icon="fa fa-user"
            component={FInput}
            size="small"
          />
          <Note>{translate('resetPassword.key2')}</Note>
          <Button
            isLoading={this.props.submitting}
            disabled={this.props.submitting}
            size="small"
            block
            color="primary"
          >
            {translate('resetPassword.key6')}
          </Button>
        </Form>
      </Container>
    )
  }
}
