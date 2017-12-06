import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import styled from 'styled-components'
import createValidateComponent from 'components/elements/redux-form-validate'
import InputLabel from 'components/elements/input-label'
import Clearfix from 'components/elements/clearfix'

const FInputLabel = createValidateComponent(InputLabel)

const LandfillFormContainer = styled.div``

@reduxForm({
  form: 'landfillForm'
})
export default class LandfillForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Field
          name="code"
          label="Code"
          placeholder=""
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Field name="name" label="Tên trạm" component={FInputLabel} />
      </form>
    )
  }
}
