import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import createValidateComponent from 'components/elements/redux-form-validate'
import InputLabel from 'components/elements/input-label'

import Clearfix from 'components/elements/clearfix'

/*
 <Field
          name="code"
          label="Codes"
          placeholder=""
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Field name="name" label="Tên trạm" component={FInputLabel} />
        <button>Hello</button>
 */

const FInputLabel = createValidateComponent(InputLabel)

@reduxForm({
  form: 'landFillForm'
})
export default class LandfillForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  onSubmit(values){
    console.log(values)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="code"
          label="Codes"
          placeholder=""
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Field name="name" label="Tên trạm" component={FInputLabel} />
      </form>
    )
  }
}
