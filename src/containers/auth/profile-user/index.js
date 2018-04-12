import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Row, Col } from 'reactstrap'
import swal from 'sweetalert2'
import { InputLabel, createValidateComponent } from 'components/elements'
import Button from 'components/elements/button'
import CalendarCustom from 'components/elements/datetime-picker'
import InputPhoneNumber from 'components/elements/input-phone-number'
import UpdateLoadImage from 'components/elements/upload-image-avatar'
import AuthApi from 'api/AuthApi'
import { translate } from 'hoc/create-lang'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { autobind } from 'core-decorators'
import Breadcrumb from 'containers/auth/breadcrumb'
import {fetchUserMe} from "redux/actions/authAction"
import {connectAutoDispatch} from "redux/connect";
import moment from 'moment'

const FInput = createValidateComponent(InputLabel)
const FCalendar = createValidateComponent(CalendarCustom)
const FInputPhoneNumber = createValidateComponent(InputPhoneNumber)
const FUpdateLoadImage = createValidateComponent(UpdateLoadImage)

const Clearfix = styled.div`
  height: 24px;
`

function validate(values) {
  const errors = {}

  return errors
}

@reduxForm({
  form: 'ProfileUser',
  validate
})
@autobind
export class ProfileUserForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      image: {}
    }
  }

  async componentWillMount() {
    if (this.props.initialValues.avatar) {
      this.setState({
        image: {
          url: this.props.initialValues.avatar
        }
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit.bind(this))}>
        <Row>
          <Col md={6}>
            <Field
              disabled={true}
              label="UserName"
              name="username"
              component={FInput}
              size="small"
            />
          </Col>
          <Col md={6}>
            <Field
              disabled={true}
              label="Email"
              name="email"
              component={FInput}
              size="small"
            />
          </Col>
        </Row>
        <Clearfix />
        <Row>
          <Col md={6}>
            <Field
              label="Last Name"
              name="lastName"
              component={FInput}
              size="small"
            />
          </Col>
          <Col md={6}>
            <Field
              label="First Name"
              name="firstName"
              component={FInput}
              size="small"
            />
          </Col>
        </Row>
        <Clearfix />
        <Row>
          <Col md={6}>
            <Field
              label="Birthday"
              name="birthday"
              component={FCalendar}
              size="large"
            />
          </Col>
          <Col md={6}>
            <Field
              label="Phone"
              name="phone"
              component={FInputPhoneNumber}
              size="large"
            />
          </Col>
        </Row>
        <Clearfix />
        <Row>
          <Col md={12}>
            <Field
              label="Avatar"
              name="avatar"
              component={FUpdateLoadImage}
              size="small"
            />
          </Col>
        </Row>
        <Clearfix />
        <Button disabled={this.props.submitting}  isLoading={this.props.submitting} controtertype="submit" block color="primary">
          Save
        </Button>
      </form>
    )
  }
}

@connectAutoDispatch((state) => ({}), {fetchUserMe})
@autobind
export default class ProfileUser extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      isLoaded: false
    }
  }

  async componentWillMount() {
    const record = await AuthApi.getMe()
    this.setState({
      userInfo: {
        ...record.data,
        birthday: moment(record.data.birthday)
      },
      isLoaded: true
    })
  }

  async onSubmit(values) {
    const _id = values._id
    const data = {
      ...values
    }
    const result = await AuthApi.putProfile(_id, data)
    this.props.fetchUserMe()
    if (result.error) {
      swal({
        type: 'error',
        title: result.message
      })
    } else {
      swal({
        type: 'success',
        title: translate('profileUser.success')
      })
    }
  }

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb items={['profileUser']} />
        {this.state.isLoaded && (
          <ProfileUserForm
            onSubmit={this.onSubmit}
            initialValues={this.state.userInfo}
          />
        )}
      </PageContainer>
    )
  }
}
