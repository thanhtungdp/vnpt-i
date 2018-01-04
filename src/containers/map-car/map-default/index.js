/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import MarkerCar from 'components/map/marker/marker-car'
import MarkerCarReal from 'components/map/marker/marker-car/real'
import MarkerTransit from 'components/map/marker/marker-transit-station'
import MarkerAppointment from 'components/map/marker/marker-appointment-station'
import MarkerBurial from 'components/map/marker/marker-burial-station'
import { getGoogleMapProps } from 'components/map/utils'
import carList from 'fake-data/car'
import carRealList from 'fake-data/carReal'
import appointmentStationList from 'fake-data/stationsAppointment'
import transitStationList from 'fake-data/stationsTransit'
import { burialStationList as aaaa } from 'fake-data/stationsBurial'
import { getStationBurials, getStationTransits } from 'api/StationApi'
import { resolveMapLocation } from 'utils/resolveMapLocation'

const MapCarContainer = styled.div``
const MAX_VALUE = 99999

@withScriptjs
@withGoogleMap
class CustomGoogleMap extends PureComponent {
  static propTypes = {
    markerFilter: PropTypes.object,
    isOffline: PropTypes.bool,
    isRunning: PropTypes.bool,
    isRunningPlan: PropTypes.bool,
    isWarning: PropTypes.bool,
    isTransitStation: PropTypes.bool,
    isAppointmentStation: PropTypes.bool,
    isBurialStation: PropTypes.bool
  }

  static defaultProps = {
    markerFilter: {}
  }



  render() {
    const markerFilter = this.props.markerFilter
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 10.7607494, lng: 106.6954122 }}
      >
        <div>
          {markerFilter.isRunningPlan &&
            this.props.carList.map(location => (
              <MarkerCar
                mapLocation={location.mapLocation}
                name={location.name}
                key={location.id}
                listLocation={location.listLocation}
                status={location.status}
                stationDetails={location.stationDetails}
                stationDistance={location.stationDistance}
                truckLoad={location.truckLoad}
                type={location.type}
                organization={location.organization}
              />
            ))}
          {this.props.carRealList.map(location => (
            <MarkerCarReal
              mapLocation={location.mapLocation}
              name={location.name}
              key={location.id}
              listLocation={location.listLocation}
              status={location.status}
              stationDetails={location.stationDetails}
              stationDistance={location.stationDistance}
              truckLoad={location.truckLoad}
              type={location.type}
              organization={location.organization}
              markerFilter={markerFilter}
            />
          ))}
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
                key={location.name}
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
  state = {
    burialStationList: [],
    transitStationList: []
  }

  async componentDidMount() {
    const burialStationList = await getStationBurials({ itemPerPage: MAX_VALUE })
    this.setState({
      burialStationList: await resolveMapLocation(burialStationList.data)
    })
    const transitStationList = await getStationTransits({ itemPerPage: MAX_VALUE })
    this.setState({
      transitStationList: await resolveMapLocation(transitStationList.data)
    })
    
  }

  render() {
    return (
      <MapCarContainer>
        <CustomGoogleMap
          carList={carList}
          carRealList={carRealList}
          markerFilter={this.props.markerFilter}
          transitStationList={this.state.transitStationList}
          appointmentStationList={appointmentStationList}
          burialStationList={this.state.burialStationList}
          {...getGoogleMapProps() }
        />
      </MapCarContainer>
    )
  }
}
