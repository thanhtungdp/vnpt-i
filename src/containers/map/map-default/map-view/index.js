/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { getGoogleMapProps } from 'components/map/utils'
import { getStationAutos } from 'api/StationAuto'
import { resolveMapLocation } from 'utils/resolveMapLocation'
import MarkerStation from 'components/map/marker'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import withSizes from 'react-sizes'
import LevelIntro from 'components/map/level-intro'
import PropTypes from 'prop-types'
import Marker from 'components/map/utils/marker-with-label-animate'
import { autobind } from 'core-decorators'
import { warningLevelsNumber, warningLevels } from 'constants/warningLevels'

const MapContainer = styled.div`
  position: relative;
`
const LevelWrapper = styled.div`
  position: absolute;
  left: 8px;
  bottom: 8px;
  background: #ffffff;
  border: 1px solid #eee;
  padding: 4px;
  z-index: 2;
`

@withScriptjs
@withGoogleMap
class CustomGoogleMap extends PureComponent {
  static propTypes = {
    getMap: PropTypes.func,
    getRefMarker: PropTypes.func
  }
  state = {
    zoom: 12
  }

  onMarkerClustererClick(markerClusterer) {
    const clickedMarkers = markerClusterer.getMarkers()
  }

  async componentDidMount() {
    if (this.props.getMap) this.props.getMap(this.map)
  }

  getRefMarker(marker) {
    if (this.props.getRefMarker) this.props.getRefMarker(marker)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      zoom: nextProps.zoom
    })
  }

  getStatusStation(measuringLogs) {
    let result = warningLevels.GOOD
    for (var key in measuringLogs) {
      if (
        warningLevelsNumber[result] <
        warningLevelsNumber[measuringLogs[key].warningLevel]
      )
        result = measuringLogs[key].warningLevel
    }
    return result
  }

  render() {
    const defaultCenter = { lat: 10.7607494, lng: 106.6954122 }
    return (
      <GoogleMap
        ref={map => {
          this.map = map
        }}
        defaultZoom={12}
        defaultCenter={defaultCenter}
        center={this.props.center ? this.props.center : defaultCenter}
        zoom={this.state.zoom}
        onZoomChanged={() => {
          this.setState({
            zoom: this.map.getZoom()
          })
        }}
      >
        <div>
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={70}
            maxZoom={11}
          >
            {this.props.stationAutoMarker.map((item, index) => {
              return (
                <MarkerStation
                  code={item.key}
                  getRef={this.getRefMarker.bind(this)}
                  mapLocation={item.mapLocation}
                  visible={item.visible}
                  name={item.name}
                  key={item.key}
                  status={
                    item.lastLog && item.lastLog.measuringLogs
                      ? this.getStatusStation(item.lastLog.measuringLogs)
                      : warningLevels.GOOD
                  }
                  address={item.address}
                  lastLog={item.lastLog}
                  measuringList={item.measuringList}
                />
              )
            })}
          </MarkerClusterer>
        </div>
      </GoogleMap>
    )
  }
}
@autobind
export default class MapStationAuto extends PureComponent {
  static propTypes = {
    handleGetStationAuto: PropTypes.func,
    stationAutoMarker: PropTypes.array,
    getMap: PropTypes.func
  }

  state = {
    stationAutoMarker: [],
    map: {},
    listStationMarker: []
  }

  handleGetStationAuto(stationAutoMarker) {
    this.setState({ stationAutoMarker })
  }

  setMap(map) {
    this.setState({ map })
    if (this.props.getMap) this.props.getMap(map)
  }

  setListMarker(marker) {
    this.state.listStationMarker.push(marker)
  }

  openInfoMarkerByKey(stationKey) {
    this.state.listStationMarker.forEach(item => {
      if (item.props.code === stationKey) item.openToggle()
      else item.closeToggle()
    })
  }

  closeInfoMarker() {
    this.state.listStationMarker.forEach(item => {
      item.closeToggle()
    })
  }

  async componentDidMount() {
    let stationAutoList = await getStationAutos({}, {})
    stationAutoList = stationAutoList.data.map(item => {
      item.visible = true
      return item
    })
    stationAutoList = await resolveMapLocation(stationAutoList)
    this.handleGetStationAuto(stationAutoList)
  }

  render() {
    return (
      <MapContainer>
        <LevelWrapper>
          <LevelIntro />
        </LevelWrapper>
        <CustomGoogleMap
          ref={map => {
            this.mapTamp = map
          }}
          stationAutoMarker={this.state.stationAutoMarker}
          center={this.props.center}
          getMap={this.setMap}
          getRefMarker={this.setListMarker}
          zoom={this.props.zoom}
          {...getGoogleMapProps()}
          loadingElement={
            <div style={{ height: this.props.windowHeight + 'px' }} />
          }
          containerElement={
            <div style={{ height: this.props.windowHeight + 'px' }} />
          }
          mapElement={
            <div style={{ height: this.props.windowHeight + 'px' }} />
          }
        />
      </MapContainer>
    )
  }
}
