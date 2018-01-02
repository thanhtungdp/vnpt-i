/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import MarkerCar from 'components/map/marker/marker-car'
import carList from 'fake-data/car'

const MapCarContainer = styled.div``

@withScriptjs
@withGoogleMap
class CustomGoogleMap extends PureComponent {
  static propTypes = {
    markerFilter: PropTypes.object
  }

  static defaultProps = {
    markerFilter: {}
  }

  componentWillMount() {
    const SlidingMarker = require('marker-animate-unobtrusive')
  }

  render() {
    const markerFilter = this.props.markerFilter
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 10.726909, lng: 106.616678 }}
      >
        <div>
          {markerFilter.isXe &&
            this.props.carList.map(location => (
              <MarkerCar
                mapLocation={location.mapLocation}
                name={location.name}
                key={location.id}
                listLocation={location.listLocation}
                status={location.status}
              />
            ))}
        </div>
      </GoogleMap>
    )
  }
}

export default class MapCar extends PureComponent {
  static propTypes = {
    markerFilter: PropTypes.object
  }

  render() {
    return (
      <MapCarContainer>
        <CustomGoogleMap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyACrFcsYEYnifIzzbIOEI6y2v0qVSi9TvU&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          carList={carList}
          markerFilter={this.props.markerFilter}
        />
      </MapCarContainer>
    )
  }
}
