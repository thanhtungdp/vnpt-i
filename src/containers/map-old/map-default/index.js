/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { getGoogleMapProps } from 'components/map/utils'
import { getStationAutos } from 'api/StationAuto'
import { resolveMapLocation } from 'utils/resolveMapLocation'
import MarkerStation from 'components/map/marker'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import PropTypes from 'prop-types'
const MapContainer = styled.div``

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
          <MarkerClusterer
            onClick={this.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={70}
          >
            {this.props.stationAutoMarker.map(item => (
              <MarkerStation
                mapLocation={item.mapLocation}
                visible={item.visible}
                name={item.name}
                key={item._id}
                status={'good'}
                address={item.address}
                lastLog={item.lastLog}
                measuringList={item.measuringList}
              />
            ))}
          </MarkerClusterer>
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

  async componentDidMount() {
    let stationAutoList = await getStationAutos({}, {})
    stationAutoList = stationAutoList.data.map(item => {
      item.visible = true
      return item
    })
    stationAutoList = await resolveMapLocation(stationAutoList)
    this.props.handleGetStationAuto(stationAutoList)
  }

  render() {
    return (
      <MapContainer>
        <CustomGoogleMap
          stationAutoMarker={this.props.stationAutoMarker}
          {...getGoogleMapProps()}
        />
      </MapContainer>
    )
  }
}
