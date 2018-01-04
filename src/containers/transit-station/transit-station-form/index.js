import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { reduxForm, Field } from 'redux-form'
import createValidateComponent from 'components/elements/redux-form-validate'
import InputLabel from 'components/elements/input-label'
import SelectBoxOrganization from 'components/elements/select-box-organization'
import CalendarCustom from 'components/elements/datetime-picker'
import Button from 'components/elements/button'
import Clearfix from 'components/elements/clearfix'

const FInputLabel = createValidateComponent(InputLabel)
const FSelectBoxOrganization = createValidateComponent(SelectBoxOrganization)
const FCalendarCustom = createValidateComponent(CalendarCustom)

function validate(values) {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 5) {
    errors.name = 'Must be 5 characters or more'
  }
  if (!values.organization) errors.organization = 'Required'
  if (!values.lat) errors.lat = 'Required'
  if (!values.long) errors.long = 'Required'
  return errors
}

@reduxForm({
  form: 'TransitStationForm',
  validate
})
export default class TransitStationForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEdit: PropTypes.bool
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit.bind(this))}>
        <Field name="name" label="Tên trạm" component={FInputLabel} />
        <Clearfix height={16} />
        <Field name="address" label="Địa chỉ" component={FInputLabel} />
        <Clearfix height={16} />
        <Row>
          <Col md={6}>
            <Field name="long" label="Kinh độ" component={FInputLabel} />
          </Col>
          <Col md={6}>
            <Field name="lat" label="Vĩ độ" component={FInputLabel} />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row>
          <Col md={6}>
            <Field
              name="workFromTime"
              label="Bắt đầu"
              component={FCalendarCustom}
            />
          </Col>
          <Col md={6}>
            <Field
              name="workToTime"
              label="Kết thúc"
              component={FCalendarCustom}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row>
          <Col md={6}>
            <Field
              name="arisesMass"
              label="Khối lượng tăng"
              component={FInputLabel}
            />
          </Col>
          <Col md={6}>
            <Field name="acreage" label="Diện tích" component={FInputLabel} />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row>
          <Col>
            <Field
              name="organization"
              label="Tổ chức"
              component={FSelectBoxOrganization}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Button
          type="submit"
          block
          color="primary"
          disabled={this.props.submitting}
          isLoading={this.props.submitting}
        >
          {this.props.isEdit ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </form>
    )
  }
}
