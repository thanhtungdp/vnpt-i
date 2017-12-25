/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import MarkerTransit from 'components/map/marker/marker-transit-station'
import MarkerAppointment from 'components/map/marker/marker-appointment-station'
import MarkerBurial from 'components/map/marker/marker-burial-station'
import appointmentStationList from 'fake-data/stationsAppointment'
import transitStationList from 'fake-data/stationsTransit'
import { burialStationList } from 'fake-data/stationsBurial'

const MapDefaultContainer = styled.div``

@withScriptjs
@withGoogleMap
class CustomGoogleMap extends PureComponent {
  static propTypes = {
    markerFilter: PropTypes.object
  }

  static defaultProps = {
    markerFilter: {}
  }

  render() {
    const markerFilter = this.props.markerFilter
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 10.726909, lng: 106.616678 }}
      >
        <div>
          {markerFilter.isTransitStation &&
            this.props.transitStationList.map(location => (
              <MarkerTransit
                mapLocation={location.mapLocation}
                name={location.name}
                key={location.id}
              />
            ))}

          {markerFilter.isAppointmentStation &&
            this.props.appointmentStationList.map(location => (
              <MarkerAppointment
                mapLocation={location.mapLocation}
                name={location.name}
                key={location.id}
              />
            ))}

          {markerFilter.isBurialStation &&
            this.props.burialStationList.map(location => (
              <MarkerBurial
                mapLocation={location.mapLocation}
                name={location.name}
                key={location.id}
              />
            ))}
        </div>
      </GoogleMap>
    )
  }
}

export default class MapDefault extends PureComponent {
  static propTypes = {
    markerFilter: PropTypes.object
  }

  render() {
    return (
      <MapDefaultContainer>
        <CustomGoogleMap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyACrFcsYEYnifIzzbIOEI6y2v0qVSi9TvU&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          transitStationList={transitStationList}
          appointmentStationList={appointmentStationList}
          markerFilter={this.props.markerFilter}
          burialStationList={burialStationList}
        />
      </MapDefaultContainer>
    )
  }
}
