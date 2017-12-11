/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap
} from 'react-google-maps'
const {
  MarkerWithLabel
} = require('react-google-maps/lib/components/addons/MarkerWithLabel')

const MapDefaultContainer = styled.div``

@withScriptjs
@withGoogleMap
class CustomGoogleMap extends PureComponent {
  render() {
    return (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {this.props.isMarkerShown &&
          <MarkerWithLabel
            position={{ lat: -34.397, lng: 150.644 }}
            labelAnchor={new google.maps.Point(25, 0)}
            labelStyle={{
              backgroundColor: 'yellow',
              fontSize: '10px',
            }}
          >
	          <div>Hello There!</div>
          </MarkerWithLabel>}
      </GoogleMap>
    )
  }
}

export default class MapDefault extends PureComponent {
  static propTypes = {}
  render() {
    return (
      <MapDefaultContainer>
        <CustomGoogleMap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </MapDefaultContainer>
    )
  }
}
