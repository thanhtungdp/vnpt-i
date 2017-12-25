import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import createValidateComponent from 'components/elements/redux-form-validate'
import InputLabel from 'components/elements/input-label'
import Button from 'components/elements/button'
import Clearfix from 'components/elements/clearfix'

const FInputLabel = createValidateComponent(InputLabel)

function validate(values) {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 4) {
    errors.name = 'Must be 4 characters or more'
  }
  if (!values.address) errors.address = 'Required'
  return errors
}

@reduxForm({
  form: 'organizationForm',
  validate
})
@withRouter
export default class OrganizationForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    isEdit: PropTypes.bool
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit.bind(this))}>
        <Field
          name="name"
          label="Name"
          placeholder="Tên Doanh Nghiệp"
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Field
          name="address"
          label="Address"
          placeholder="Địa chỉ"
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Field
          name="description"
          type="textarea"
          label="Description"
          placeholder="Mô tả"
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Field
          name="director"
          label="Director"
          placeholder="Giám đốc"
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Button
          type="submit"
          color="primary"
          block
          isLoading={this.props.submitting}
          disabled={this.props.submitting}
        >
          {this.props.isEdit ? 'Update' : 'Create'}
        </Button>
      </form>
    )
  }
}
