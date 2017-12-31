import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { reduxForm, Field } from 'redux-form'
import createValidateComponent from 'components/elements/redux-form-validate'
import InputLabel from 'components/elements/input-label'
import SelectBoxOrganization from 'components/elements/select-box-organization'
import CalendarCustom from 'components/elements/calendar'
import Clearfix from 'components/elements/clearfix'

const FInputLabel = createValidateComponent(InputLabel)
const FSelectBoxOrganization = createValidateComponent(SelectBoxOrganization)
const FCalendarCustom = createValidateComponent(CalendarCustom)

@reduxForm({
  form: 'landFillForm'
})
export default class LandfillForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit.bind(this))}>
        <Field name="name" label="Tên trạm" component={FInputLabel} />
        <Clearfix height={16} />
        <Field name="address" label="Địa chỉ" component={FInputLabel} />
        <Clearfix height={16} />
        <Field name="lat" label="Kinh độ" component={FInputLabel} />
        <Clearfix height={16} />
        <Field name="long" label="Vĩ độ" component={FInputLabel} />
        <Clearfix height={16} />
        <Row>
          <Col md={4}>
            <Field
              name="airsesFromDate"
              label="Phát sinh từ ngày"
              component={FCalendarCustom}
            />
          </Col>
          <Col md={4}>
            <Field
              name="airsesToDate"
              label="Phát sinh đến ngày"
              component={FCalendarCustom}
            />
          </Col>
          <Col md={4}>
            <Field name="year" label="Năm" component={FInputLabel} />
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
      </form>
    )
  }
}
