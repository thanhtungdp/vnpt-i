import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field, FieldArray } from 'redux-form'
import createValidateComponent from 'components/elements/redux-form-validate/index'
import InputLabel from 'components/elements/input-label/index'
import Button from 'components/elements/button/index'
import Clearfix from 'components/elements/clearfix/index'
import SelectImageList from './select-image-list'
import { Sticky } from 'react-sticky'

const FInputLabel = createValidateComponent(InputLabel)

function validate(values) {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  return errors
}

@reduxForm({
  form: 'gallerySliderForm',
  validate
})
@withRouter
export default class GallerySliderForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    isEdit: PropTypes.bool
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Field
          name="name"
          label="Tên slider"
          readOnly={this.props.isEdit ? 'readOnly' : ''}
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Field
          name="description"
          type="textarea"
          label="Mô tả"
          placeholder="Mô tả"
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <FieldArray name="images" component={SelectImageList} />
        <Clearfix height={16} />
        <Sticky>
          {props => (
            <div style={{ ...props.style, top: '', bottom: '0px' }}>
              <Button
                type="submit"
                color="primary"
                block
                isLoading={this.props.submitting}
                disabled={this.props.submitting}
              >
                {this.props.isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          )}
        </Sticky>
      </form>
    )
  }
}
