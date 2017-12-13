/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import MarkerTransit from 'components/map/marker/marker-transit-station';
import MarkerAppointment from 'components/map/marker/marker-appointment-station';
import MarkerBurial from 'components/map/marker/marker-burial-station';
import appointmentStationList from  'fake-data/stationsAppointment'
import transitStationList from  'fake-data/stationsTransit'
import {BurialStationList} from  'fake-data/stationsBurial'
const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel');

const MapDefaultContainer = styled.div``;

@withScriptjs
@withGoogleMap
class CustomGoogleMap extends PureComponent {
	render() {
		return (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: 10.726909, lng: 106.616678 }}>
				<div>
					{this.props.transitStationList.map(location => (
						<MarkerTransit mapLocation={location.mapLocation} name={location.name} key={location.id} />
          ))}
          
          {this.props.appointmentStationList.map(location => (
						<MarkerAppointment mapLocation={location.mapLocation} name={location.name} key={location.id} />
          ))}
          
          {this.props.BurialStationList.map(location => (
						<MarkerBurial mapLocation={location.mapLocation} name={location.name} key={location.id} />
					))}
				</div>
			</GoogleMap>
		);
	}
}

export default class MapDefault extends PureComponent {
	static propTypes = {};
	render() {
		return (
			<MapDefaultContainer>
				<CustomGoogleMap
					isMarkerShown
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyACrFcsYEYnifIzzbIOEI6y2v0qVSi9TvU&v=3.exp&libraries=geometry,drawing,places"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          transitStationList = {transitStationList}
          appointmentStationList = {appointmentStationList}
          BurialStationList = {BurialStationList}
				/>
			</MapDefaultContainer>
		);
	}
}
