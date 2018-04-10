import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import StationAutoApi from 'api/StationAuto'
import connectWindowHeight from '../hoc-window-height'
import SidebarList from './sidebar-list'
import AnalyticView from './analytic-view'
import MapView from './map-view'
import { resolveMapLocationObject } from 'utils/resolveMapLocation'

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

@connectWindowHeight
@autobind
export default class MapDefault extends React.PureComponent {
  state = {
    stationsAuto: [],
    stationSelected: {},
    center: null,
    map: null,
    zoom: 5
  }

  handleSelectStation(stationSelected) {
    const defaultZoom = 12
    let updateState = { stationSelected }
    if (this.state.map && this.state.map.getZoom() !== defaultZoom)
      updateState.zoom = defaultZoom
    updateState.timeUpdate = new Date()
    this.setState(updateState, () => {
      if (this.state.map) {
        this.state.map.panTo(resolveMapLocationObject(stationSelected))
      }
      this.mapView.closeInfoMarker()
      this.mapView.openInfoMarkerByKey(stationSelected.key)
    })
  }

  async componentDidMount() {
    let resStationsAuto = await StationAutoApi.getStationAutos({}, {})
    this.setState({
      stationsAuto: resStationsAuto.data
    })
  }

  render() {
    return (
      <MapDefaultWrapper height={this.props.windowHeight}>
        <Clearfix />
        <ColLeft>
          <SidebarList
            onSelectStation={this.handleSelectStation}
            stationSelected={this.state.stationSelected}
            stationsAuto={this.state.stationsAuto}
          />
        </ColLeft>
        <Clearfix />
        <MapCenter>
          <MapView
            ref={mapView => {
              this.mapView = mapView
            }}
            windowHeight={this.props.windowHeight}
            center={this.state.center}
            getMap={map => this.setState({ map })}
            zoom={this.state.zoom}
          />
        </MapCenter>
        <Clearfix />
        <ColRight>
          <AnalyticView />
        </ColRight>
        <Clearfix />
      </MapDefaultWrapper>
    )
  }
}
