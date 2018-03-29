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
  onMarkerClustererClick(markerClusterer) {
    const clickedMarkers = markerClusterer.getMarkers()
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 10.7607494, lng: 106.6954122 }}
      >
        <div>
          {/*<MarkerClusterer*/}
          {/*onClick={this.onMarkerClustererClick}*/}
          {/*averageCenter*/}
          {/*enableRetinaIcons*/}
          {/*gridSize={70}*/}
          {/*>*/}
          {/*{this.props.stationAutoMarker.map((item, index) => (*/}
          {/*<MarkerStation*/}
          {/*mapLocation={item.mapLocation}*/}
          {/*visible={item.visible}*/}
          {/*name={item.name}*/}
          {/*key={index}*/}
          {/*status={'good'}*/}
          {/*address={item.address}*/}
          {/*lastLog={item.lastLog}*/}
          {/*measuringList={item.measuringList}*/}
          {/*/>*/}
          {/*))}*/}
          {/*</MarkerClusterer>*/}
        </div>
      </GoogleMap>
    )
  }
}

export default class MapStationAuto extends PureComponent {
  static propTypes = {
    handleGetStationAuto: PropTypes.func,
    stationAutoMarker: PropTypes.array
  }

  state = {
    stationAutoMarker: []
  }

  handleGetStationAuto(stationAutoMarker) {
    this.setState({ stationAutoMarker })
  }

  async componentDidMount() {
    // let stationAutoList = await getStationAutos({}, {})
    // stationAutoList = stationAutoList.data.map(item => {
    //   item.visible = true
    //   return item
    // })
    // stationAutoList = await resolveMapLocation(stationAutoList)
    // this.handleGetStationAuto(stationAutoList)
  }

  render() {
    return (
      <MapContainer>
        <LevelWrapper>
          <LevelIntro />
        </LevelWrapper>
        <CustomGoogleMap
          stationAutoMarker={this.state.stationAutoMarker}
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
