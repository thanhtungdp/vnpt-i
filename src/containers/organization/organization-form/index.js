import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import createValidateComponent from 'components/elements/redux-form-validate'
import InputLabel from 'components/elements/input-label'
import Button from 'components/elements/button'
import Clearfix from 'components/elements/clearfix'
import { autobind } from 'core-decorators'

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
@autobind
export default class OrganizationForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    isEdit: PropTypes.bool
  }

  handleSubmit(values) {
    const data = {
      name: values.name,
      address: values.address,
      description: values.description,
      director: values.director
    }
    return this.props.onSubmit(data)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field
          name="name"
          label="Tên doanh nghiệp"
          placeholder="Tên doanh nghiệp"
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Field
          name="address"
          label="Đại chỉ"
          placeholder="Địa chỉ"
          component={FInputLabel}
        />
        <Clearfix height={8} />
        <Field
          name="description"
          type="textarea"
          label="Mô tả"
          placeholder="Mô tả"
          component={FInputLabel}
        />
        <Clearfix height={8} />
        <Field
          name="director"
          label="Giám đốc"
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
          {this.props.isEdit ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </form>
    )
  }
}
