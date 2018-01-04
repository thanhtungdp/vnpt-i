import React, { PureComponent } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { autobind } from 'core-decorators'
import createValidateComponent from 'components/elements/redux-form-validate/index'
import InputLabel from 'components/elements/input-label/index'
import SingleSelect from 'components/elements/single-select/index'
import SelectCategory from 'components/elements/select-category/index'
import Button from 'components/elements/button/index'

import Clearfix from 'components/elements/clearfix/index'
import categoriesType from 'constants/categoryType'

const FInputLabel = createValidateComponent(InputLabel)
const FSelect = createValidateComponent(SingleSelect)
const FSelectCategory = createValidateComponent(SelectCategory)

function validate(values) {
  const min = 4
  const errors = {}
  if (!values.code) {
    errors.code = 'Vui lòng điền mã code'
  } else if (values.code.length < min) {
    errors.code = 'Mã code phải có ít nhất ' + min + ' ký tự'
  }
  if (values.name && values.name.length < min) {
    errors.name = 'Tên phải có ít nhất ' + min + ' ký tự'
  }
  return errors
}

const categoryTypeDataItems = [
  {
    heading: 'Loại chuyên mục',
    items: [
      { value: categoriesType.COUNTRY, content: 'Quận - huyện' },
      { value: categoriesType.WARD, content: 'Phường - xã' }
    ]
  }
]

@reduxForm({
  form: 'categoriesForm',
  validate: validate
})
@autobind
export default class CategoriesForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    isEdit: PropTypes.bool
  }

  handleSubmit(values) {
    return this.props.onSubmit(values)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Row>
          <Col md={4}>
            <Field
              name="type"
              component={FSelect}
              label="Loại chuyên mục"
              dataItems={categoryTypeDataItems}
            />
          </Col>
          <Col md={4}>
            <Field
              name="parentId"
              component={FSelectCategory}
              label="Chuyên mục cha"
            />
          </Col>
          <Col md={4}>
            <Field
              name="code"
              label="Mã code"
              placeholder=""
              component={FInputLabel}
              readOnly={this.props.isEdit}
            />
          </Col>
        </Row>
        <Clearfix height={8} />
        <Field
          name="name"
          label="Tên chuyên mục"
          placeholder=""
          component={FInputLabel}
        />
        <Clearfix height={8} />
        <Field
          name="description"
          type="textarea"
          label="Mô tả"
          placeholder=""
          component={FInputLabel}
        />
        <Clearfix height={16} />
        <Button
          isLoading={this.props.submitting}
          type="submit"
          block
          color="primary"
        >
          {this.props.isEdit ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </form>
    )
  }
}
