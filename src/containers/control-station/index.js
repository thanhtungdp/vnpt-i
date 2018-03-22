import React from 'react'
import { Tabs, Icon, message } from 'antd'
import PropTypes from 'prop-types'
import ControlStationHistory from 'containers/control-station/control-station-history/index'
import ControlStationConfig from 'containers/control-station/control-station-config/index'
import ControlStationTrigger from 'containers/control-station/control-station-trigger/index'
import StationControl from 'api/StationControl'
import moment from 'moment'
import { autobind } from 'core-decorators'
import createManagerEdit from 'hoc/manager-edit'

const TabPane = Tabs.TabPane

@createManagerEdit({
  apiUpdate: StationControl.trigger_StationControl
})
@autobind
export default class ControlStation extends React.PureComponent {
  static propTypes = {
    stationKey: PropTypes.string,
    stationName: PropTypes.string
  }
  constructor(props) {
    super(props)
    this.state = {
      dataStation: {},
      dataHistory: [],
      isLoaded: false,
      isTriggerExceeded: false,
      isTriggerAuto: false
    }
  }

  async getHistory() {
    const stationKey = this.props.stationKey
    const record_history = await StationControl.getHistory_StationControl(
      stationKey
    )
    this.setState({
      dataHistory: record_history
    })
  }

  async loadData() {
    const stationKey = this.props.stationKey
    const record_info = await StationControl.getStationControl(stationKey)
    this.setState({
      dataStation: {
        tagName: record_info.MT_NAME,
        configTotal: record_info.TongChai,
        total: record_info.TongChai,
        totalTaken: record_info.ChaiDaLay,
        typeControl: record_info.ThuCong === true ? 1 : 0,
        amount_get: record_info.ChaiCanLay,
        timer:
          record_info.HenGio === null ? moment() : moment(record_info.HenGio),
        date:
          record_info.HenGio === null
            ? moment().format('DD/MM/YYYY')
            : moment(record_info.HenGio, 'DD/MM/YYYY'),
        periodic: record_info.ChuKyLayMau
      },
      isLoaded: true,
      isTriggerAuto: this.getTriggerAuto(record_info.HenGio),
      isTriggerExceeded:
        record_info.LayMauVuotNguong === null
          ? false
          : record_info.LayMauVuotNguong
    })
  }

  getTriggerAuto(value) {
    return value === null ? false : true
  }

  async componentDidMount() {
    this.loadData()
  }

  async onSubmittriger(data) {
    const record = await StationControl.trigger_StationControl(
      data.trangThai,
      data
    )
    if (record === '') {
      message.success('Success')
      this.setState({
        isTriggerAuto: this.getTriggerAuto(data.HenGio)
      })
    }
  }

  async handleSubmitExceeded(key, status) {
    const record = await StationControl.triggerExceeded_StationControl(
      key,
      status ? 1 : 0
    )
    this.setState({
      isTriggerExceeded: status
    })
    if (record === '') message.success('Success')
  }

  onTabClick(tabkey) {
    if (tabkey === 1) {
      this.loadData()
    } else if (tabkey === 2) {
      this.getHistory()
    }
  }

  render() {
    return (
      <Tabs defaultActiveKey="1" onTabClick={this.onTabClick.bind(this)}>
        <TabPane forceRender={false} tab={<span>Control Station</span>} key="1">
          {this.state.isLoaded ? (
            <ControlStationTrigger
              initialValues={this.state.dataStation}
              stationKey={this.props.stationKey}
              stationName={this.props.stationName}
              onSubmit={this.onSubmittriger}
              handleSubmitExceeded={this.handleSubmitExceeded}
              isTriggerExceeded={this.state.isTriggerExceeded}
              typeControl={this.state.dataStation.typeControl}
              isTriggerAuto={this.state.isTriggerAuto}
            />
          ) : null}
        </TabPane>

        <TabPane
          tab={
            <span>
              <Icon type="profile" />History
            </span>
          }
          key="2"
        >
          <ControlStationHistory datasource={this.state.dataHistory} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="setting" />Config
            </span>
          }
          key="3"
        >
          <ControlStationConfig
            initialValues={this.state.dataStation}
            stationKey={this.props.stationKey}
            stationName={this.props.stationName}
            isEdit={false}
          />
        </TabPane>
      </Tabs>
    )
  }
}
