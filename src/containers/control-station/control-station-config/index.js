import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import Button from 'components/elements/button/index'
import { reduxForm, Field } from 'redux-form'
import { autobind } from 'core-decorators'
import { withRouter } from 'react-router-dom'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Breadcrumb from 'containers/control-station/breadcrumb'
import createValidateComponent from 'components/elements/redux-form-validate/index'
import createLanguage, { langPropTypes } from 'hoc/create-lang/index'
import InputLabel from 'components/elements/input-label/index'
import InputNumberCell from 'components/elements/input-number-cell/index'
import Clearfix from 'components/elements/clearfix/index'
import slug from 'constants/slug'
import SamplingApi from 'api/SamplingApi'
import swal from 'sweetalert2'
import { translate } from 'hoc/create-lang'
import { connect } from 'react-redux'

const FInputLabel = createValidateComponent(InputLabel)
const FInputNumberCell = createValidateComponent(InputNumberCell)

function validate(values) {
  const errors = {}
  if (!values.tagName) {
    errors.tagName = 'Required'
  } else if (!values.total) {
    errors.total = 'Required'
  }
  return errors
}

@reduxForm({
  form: 'ControlStationConfigForm',
  validate
})
@createLanguage
@autobind
export class ControlStationConfigForm extends PureComponent {
  static propTypes = {
    lang: langPropTypes,
    onSubmit: PropTypes.func,
    handleReset: PropTypes.func,
    initialValues: PropTypes.object
  }

  render() {
    return (
      <form>
        <Row>
          <Col span={24}>
            <Field
              disabled={false}
              label={translate('controlStation.tagName')}
              name={'tagName'}
              component={FInputLabel}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row>
          <Col span={24}>
            <Field
              name={'total'}
              editable={true}
              disabled={false}
              label={translate('controlStation.configTotal')}
              component={FInputNumberCell}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row gutter={16}>
          <Col span={12}>
            <Button
              type="button"
              block
              color="primary"
              disabled={this.props.submitting}
              isLoading={this.props.submitting}
              onClick={this.props.handleSubmit(this.props.onSubmit.bind(this))}
            >
              {translate('addon.save')}
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="reset"
              block
              color="primary"
              onClick={this.props.handleSubmit(
                this.props.handleReset.bind(this)
              )}
            >
              {translate('addon.reset')}
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

@connect(state => ({
  organization: state.auth.userInfo.organization
}))
@withRouter
@autobind
export default class ControlStationConfig extends PureComponent {
  state = {
    dataStation: {},
    isLoaded: false
  }

  async componentWillMount() {
    const key = this.props.match.params.key
    const record = await SamplingApi.getStationControl(
      key,
      this.props.organization._id
    )

    if (record.success) {
      this.setState({
        dataStation: {
          ...record.data,
          total: record.data.TongChai,
          tagName: record.data.MT_NAME
        },
        isLoaded: true
      })
    }

    this.setState({
      isLoaded: true
    })
  }

  async onSubmit(values) {
    this.save(1, values)
  }
  async handleReset(values) {
    this.save(0, values)
  }

  async save(status, values) {
    const key = this.props.match.params.key
    const name = this.props.match.params.name
    let data = {
      Status: status, //1:  cấu hình, 0 : reset
      MaTram: key,
      TenTram: name,
      MT_Name: values.tagName,
      TongSoChai: values.total,
      MaToChuc: this.props.organization._id
    }
    const record = await SamplingApi.config_StationControl(data)

    if (record.success) {
      let message =
        status === 1
          ? translate('controlStation.config.success')
          : translate('controlStation.config.reset')
      swal({
        title: translate('controlStation.success.text'),
        type: 'success',
        text: message
      })
    } else {
      swal({
        title: translate('controlStation.error.text'),
        type: 'error',
        text: record.message
      })
    }
  }

  render() {
    return (
      <PageContainer>
        <Breadcrumb
          items={[
            {
              key: 'trigger',
              custom: {
                href:
                  slug.controlStation.triggerWithKey +
                  `/${this.props.match.params.key}/${
                    this.props.match.params.name
                  }`
              }
            },
            {
              key: 'config',
              custom: {
                href:
                  slug.controlStation.configWithKey +
                  `/${this.props.match.params.key}/${
                    this.props.match.params.name
                  }`
              }
            },
            {
              id: 'info',
              name: `${this.props.match.params.name}`
            }
          ]}
        />
        {this.state.isLoaded && (
          <ControlStationConfigForm
            onSubmit={this.onSubmit}
            handleReset={this.handleReset}
            initialValues={this.state.dataStation}
          />
        )}
      </PageContainer>
    )
  }
}
