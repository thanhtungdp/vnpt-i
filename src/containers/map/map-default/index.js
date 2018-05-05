import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import StationAutoApi from 'api/StationAuto'
import connectWindowHeight from '../hoc-window-height'
import SidebarList from './sidebar-list'
import AnalyticView from './analytic-view'
import MapView from './map-view'
import { resolveMapLocation } from 'utils/resolveMapLocation'
import BoxHideLayout from 'components/map/box-hide-layout'
import stationStatus from 'constants/stationStatus'
import { warningLevelsNumber, warningLevels } from 'constants/warningLevels'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'
import queryFormDataBrowser from 'hoc/query-formdata-browser'

const MapDefaultWrapper = styled.div`
  display: flex;
  height: ${props => props.height}px;
`

const Clearfix = styled.div`
  width: 8px;
`

const ColLeft = styled.div`
  width: 240px;
  display: flex;
`
const MapCenter = styled.div`
  flex: 1;
`
const ColRight = styled.div`
  width: 280px;
  display: flex;
`

@queryFormDataBrowser([])
@protectRole(ROLE.MAP.VIEW)
@connectWindowHeight
@autobind
export default class MapDefault extends React.PureComponent {
  state = {
    stationsAuto: [],
    stationSelected: {},
    center: null,
    map: null,
    zoom: 5,
    isHidden: false,
    isLeft: true,
    isRight: true
  }

  handleSelectStation(stationSelected) {
    console.log(stationSelected)
    const defaultZoom = 12
    let updateState = { stationSelected }
    if (this.state.map && this.state.map.getZoom() !== defaultZoom)
      updateState.zoom = defaultZoom
    updateState.timeUpdate = new Date()
    this.setState(updateState, () => {
      if (this.state.map) {
        const panToMap = {
          lat: parseFloat(stationSelected.mapLocation.lat),
          lng: parseFloat(stationSelected.mapLocation.lng)
        }
        // console.log(panToMap)
        this.state.map.panTo(panToMap)
      }
      //this.mapView.closeInfoMarker()
      this.mapView.openInfoMarkerByKey(stationSelected.key)
    })
  }

  componentDidMount() {
    if (this.props.formData.stationAuto) {
      setTimeout(() => {
        this.handleSelectStation(this.props.formData.stationAuto)
      }, 1000)
    }
  }

  async componentWillMount() {
    let resStationsAuto = await StationAutoApi.getLastLog()
    if (resStationsAuto.success) {
      let stationAutoList = resStationsAuto.data
      stationAutoList = stationAutoList.map(item => {
        item.visible = true
        return item
      })
      stationAutoList = await resolveMapLocation(stationAutoList)
      this.setState({
        stationsAuto: stationAutoList
      })
    }
  }

  handelOnLickHideLeftLayout({ isLeft, isRight }) {
    this.setState({
      isLeft: isLeft
    })
  }

  handelOnLickHideRightLayout({ isLeft, isRight }) {
    this.setState({
      isRight: isRight
    })
  }

  fillStatusChange(focusStatus) {
    let res = this.state.stationsAuto

    res = res.map(element => {
      element.visible = false

      let isFind = false
      let status
      if (element.status === stationStatus.DATA_LOSS) {
        status = stationStatus.DATA_LOSS
        isFind = true
      }
      if (!isFind && element.status === stationStatus.NOT_USE) {
        status = stationStatus.NOT_USE
        isFind = true
      }

      if (!isFind) {
        let warLevel = warningLevels.GOOD
        let measuringLogs = element.lastLog.measuringLogs
        for (var key in measuringLogs) {
          if (
            warningLevelsNumber[warLevel] <
            warningLevelsNumber[measuringLogs[key].warningLevel]
          )
            warLevel = measuringLogs[key].warningLevel
          status = warLevel
        }
      }
      if (focusStatus.includes(status)) element.visible = true
      return element
    })

    this.setState({
      stationsAuto: res
    })
  }

  render() {
    return (
      <MapDefaultWrapper height={this.props.windowHeight}>
        <Clearfix />
        {this.state.isLeft && (
          <ColLeft>
            <SidebarList
              onSelectStation={this.handleSelectStation}
              stationSelected={this.state.stationSelected}
              stationsAuto={this.state.stationsAuto}
            />
          </ColLeft>
        )}
        <BoxHideLayout handelOnLick={this.handelOnLickHideLeftLayout} />
        <MapCenter>
          <MapView
            ref={mapView => {
              this.mapView = mapView
            }}
            windowHeight={this.props.windowHeight}
            center={this.state.center}
            getMap={map => this.setState({ map })}
            zoom={this.state.zoom}
            stationsAutoList={this.state.stationsAuto}
          />
        </MapCenter>
        <BoxHideLayout
          isRight={true}
          handelOnLick={this.handelOnLickHideRightLayout}
        />
        {this.state.isRight && (
          <ColRight>
            <AnalyticView
              stationsAutoList={this.state.stationsAuto}
              fillStatusChange={this.fillStatusChange}
            />
          </ColRight>
        )}
        <Clearfix />
      </MapDefaultWrapper>
    )
  }
}
