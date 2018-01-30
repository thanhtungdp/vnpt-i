/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { getGoogleMapProps } from 'components/map/utils'
import { getStationAutos } from 'api/StationAuto'
import { resolveMapLocation } from 'utils/resolveMapLocation'
import MarkerStation from 'components/map/marker'
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
          {this.props.stationAutoList.map(item => (
            <MarkerStation
              mapLocation={item.mapLocation}
              name={item.name}
              key={item._id}
              status={'good'}
              address={item.address}
              lastLog={item.lastLog}
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
      stationAutoList: await resolveMapLocation(stationAutoList.data)
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
