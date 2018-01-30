/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { getGoogleMapProps } from 'components/map/utils'
import { getStationAutos } from 'api/StationAuto'
import { resolveMapLocation } from 'utils/resolveMapLocation'
import MarkerAppointment from 'components/map/marker/marker-appointment-station'
import StationsAppointment from 'fake-data/stationsAppointment'
const MapContainer = styled.div``

@withScriptjs
@withGoogleMap
class CustomGoogleMap extends PureComponent {
  render() {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 10.7607494, lng: 106.6954122 }}
      >
        <div>
          {this.props.stationAutoList.map(location => (
            <MarkerAppointment
              mapLocation={location.mapLocation}
              name={location.name.vi}
              key={location._id}
            />
          ))}
        </div>
      </GoogleMap>
    )
  }
}

export default class MapCar extends PureComponent {
  state = {
    stationAutoList: []
  }

  async componentDidMount() {
    const stationAutoList = await getStationAutos({}, {})
    this.setState({
      stationAutoList: await resolveMapLocation(stationAutoList.data) //StationsAppointment
    })
  }

  render() {
    return (
      <MapContainer>
        <CustomGoogleMap
          stationAutoList={this.state.stationAutoList}
          {...getGoogleMapProps()}
        />
      </MapContainer>
    )
  }
}
