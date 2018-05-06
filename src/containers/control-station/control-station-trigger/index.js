import React from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import styled from 'styled-components'
import { autobind } from 'core-decorators'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert2'
import createLanguage, { translate } from 'hoc/create-lang/index'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import Breadcrumb from 'containers/control-station/breadcrumb'
import ControlStationTriggerForm from 'containers/control-station/control-station-trigger/control-station-trigger-form'
import StationControl from 'api/StationControl'
import AuthApi from 'api/AuthApi'
import moment from 'moment'

const LinkSpan = styled.span`
  &:hover {
    cursor: pointer;
  }
`

@createLanguage
@withRouter
@autobind
export default class ControlStationTrigger extends React.PureComponent {
  static propTypes = {}

  state = {
    dataStation: {},
    isLoaded: false,
    isSamplingAuto: false, // kích hoạt đang lấy mẫu tự động
    isSampling: false, // kích hoạt đang lấy mẫu thủ công,
    isTriggerExceeded: false, // Kích hoạt lấy mẫu vượt ngưỡng
    user: {}
  }

  async loadData() {
    const key = this.props.match.params.key
    const record = await StationControl.getStationControl(key)
    const dataEmail = await AuthApi.getMe()
    if (record.error && record.message === 'NOT_CONFIG') {
      swal({
        title: 'Config?',
        text: 'Please configure the controller!',
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'OK, config it!',
        reverseButtons: false
      }).then(result => {
        if (result) {
          this.props.history.push(
            slug.controlStation.configWithKey +
              `/${this.props.match.params.key}/${this.props.match.params.name}`
          )
        }
      })
    } else if (record.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: record.message
      })
    } else {
      const typeControl = record.data.ThuCong === true ? 1 : 0
      this.setPropsSampling(typeControl, record.data)
      this.setState(
        {
          dataStation: {
            ...record.data,
            total: record.data.TongChai,
            totalTaken: record.data.ChaiDaLay,
            typeControl: typeControl,
            amount_get: record.data.ChaiCanLay ? record.data.ChaiCanLay : 0,
            timer:
              record.data.HenGio === null
                ? moment()
                : moment(record.data.HenGio),
            date:
              record.data.HenGio === null
                ? moment().format('DD/MM/YYYY')
                : moment(record.data.HenGio, 'DD/MM/YYYY'),
            periodic: record.data.ChuKyLayMau ? record.data.ChuKyLayMau : 0
          },
          isLoaded: true,
          isTriggerExceeded: record.data.LayMauVuotNguong,
          user: dataEmail
        },
        () => {}
      )
    }
  }

  async componentDidMount() {
    this.startTimer()
  }

  async componentWillUnmount() {
    this.stopTimer()
  }

  async handleSubmit(values) {
    const typeControl = values.typeControl.value
    const key = this.props.match.params.key
    let data = {
      Status: 1,
      MaTram: key,
      ThuCong: typeControl,
      ChaiCanLay: values.amount_get,
      Email: this.state.user.data.email
    }
    if (typeControl === 0) {
      const datetime = moment(
        (typeof values.date === 'string'
          ? values.date
          : values.date.format('YYYY/MM/DD')) +
          ' ' +
          values.timer.format('HH:mm')
      )
      data = {
        ...data,
        ChuKyLayMau: values.periodic,
        HenGio: datetime
      }
    }

    const record = await StationControl.trigger_StationControl(data)
    if (record.success) {
      swal({
        title: 'Success',
        type: 'success',
        text: translate('controlStation.trigger.triggerSuccess')
      })
      this.setPropsSampling(typeControl, { ...data, LayMau: true })
    } else {
      swal({
        title: 'Error',
        type: 'error',
        text: record.message
      })
    }
  }

  async handleCancel(values) {
    const typeControl = values.typeControl.value
    const key = this.props.match.params.key
    let data = {
      Status: 0,
      MaTram: key,
      Email: this.state.user.data.email
    }
    const record = await StationControl.trigger_StationControl(data)
    if (record.success) {
      swal({
        title: 'Success',
        type: 'success',
        text: translate('controlStation.trigger.triggerCancel')
      })
      this.setPropsSampling(typeControl, { ...data, LayMau: true })
    } else {
      swal({
        title: 'Error',
        type: 'error',
        text: record.message
      })
    }
  }

  async handleSubmitExceeded(values) {
    const key = this.props.match.params.key
    const isExxeeded = this.state.isTriggerExceeded
    let data = {
      MaTram: key,
      LayMauVuotNguong: isExxeeded ? 0 : 1
    }
    const record = await StationControl.triggerExceeded_StationControl(data)
    if (record.success) {
      swal({
        title: 'Success',
        type: 'success',
        text: translate('controlStation.trigger.triggerExceeded')
      })
    } else {
      swal({
        title: 'Error',
        type: 'error',
        text: record.message
      })
    }
    this.setState({
      isTriggerExceeded: !isExxeeded
    })
  }

  setPropsSampling(typeControl = 0, data) {
    this.setState({
      isSampling: typeControl === 1 && data.LayMau ? true : false,
      isSamplingAuto: typeControl === 0 && data.HenGio ? true : false
    })
  }

  startTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(this.loadData.bind(this), 60000) //1 phút
    this.loadData()
  }

  stopTimer() {
    clearInterval(this.timer)
  }

  buttonAdd() {
    const { lang: { t } } = this.props
    const dropdown = (
      <Menu>
        <Menu.Item key="0">
          <Link
            to={
              slug.controlStation.historyWithKey +
              `/${this.props.match.params.key}/${this.props.match.params.name}`
            }
          >
            {t('controlStation.history.base')}
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link
            to={
              slug.controlStation.configWithKey +
              `/${this.props.match.params.key}/${this.props.match.params.name}`
            }
          >
            {t('controlStation.config.base')}
          </Link>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={dropdown} trigger={['click']}>
        <LinkSpan className="ant-dropdown-link">
          <Icon type="bars" /> View more
        </LinkSpan>
      </Dropdown>
    )
  }

  render() {
    return (
      <PageContainer right={this.buttonAdd()}>
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
              id: 'info',
              name: `${this.props.match.params.name}`
            }
          ]}
        />
        {this.state.isLoaded && (
          <ControlStationTriggerForm
            isSampling={this.state.isSampling}
            isSamplingAuto={this.state.isSamplingAuto}
            isTriggerExceeded={this.state.isTriggerExceeded}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            handleSubmitExceeded={this.handleSubmitExceeded}
            typeControl={this.state.dataStation.typeControl}
            initialValues={this.state.dataStation}
          />
        )}
      </PageContainer>
    )
  }
}
