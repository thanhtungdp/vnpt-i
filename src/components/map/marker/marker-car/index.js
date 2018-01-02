/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'themes/markerIcon';
import { autobind } from 'core-decorators'
import carStatus from 'constants/carStatus'
const { InfoWindow, DirectionsRenderer } = require('react-google-maps');
// import Marker from '../../utils/marker-animate'
import Marker from '../../utils/marker-with-label-animate'


const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');

const MIN_WIDTH_INFO = '150px';
const TIME_DURATION = 1000 * 60 * 2

@autobind
export default class MarkerCar extends PureComponent {
	static propTypes = {
		mapLocation: PropTypes.object,
		name: PropTypes.string,
		listLocation: PropTypes.array,
		status: PropTypes.string,
		stationDetails: PropTypes.array,
		stationDistance: PropTypes.array
	};

	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			mapLocation: props.mapLocation,
			status: carStatus.WARNING,
			indexLocation: 0,
			directions: null,
			isShowDirection: false
		}
	}

	toggleOpen() {
		if(!this.state.directions){
			const DirectionsService = new google.maps.DirectionsService();
			DirectionsService.route(this.getRouteDirection(this.props.stationDetails, this.props.stationDistance), (result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: result,
					});
				} else {
					console.error(`error fetching directions ${result}`);
				}
			});
		}
		this.setState({ isOpen: !this.state.isOpen, isShowDirection: !this.state.isShowDirection });
	}

	getIconByStatus(status) {
		switch (status) {
			case carStatus.OFFLINE: return Icon.carOffline; break;
			case carStatus.RUNNING: return Icon.carRunning; break;
			case carStatus.RUNNING_PLAN: return Icon.carRunningPlan; break;
			case carStatus.WARNING: return Icon.carWarning; break;
		}
	}

	componentDidMount() {
		if (this.props.status)
			this.setState({ status: this.props.status })
		if (this.state.indexLocation < this.props.listLocation.length - 1)
			this.setState({ indexLocation: ++this.state.indexLocation })
		else
			this.setState({ indexLocation: 0 })
		const newLocation = this.props.listLocation[this.state.indexLocation]
		this.setState({ mapLocation: newLocation });
		setInterval(() => {
			if (this.state.indexLocation < this.props.listLocation.length - 1)
				this.setState({ indexLocation: ++this.state.indexLocation })
			else
				this.setState({ indexLocation: 0 })
			const newLocation = this.props.listLocation[this.state.indexLocation]
			this.setState({ mapLocation: newLocation });
		}, TIME_DURATION)
	}

	getRouteDirection(stationDetails, stationDistance) {
		let result = {
			travelMode: google.maps.TravelMode.DRIVING
		}
		if (stationDetails && stationDetails.length > 1) {
			const originStation = stationDetails[0].station
			const destinationStation = stationDetails[stationDetails.length - 1].station
			result.origin = new google.maps.LatLng(originStation.mapLocation.lat, originStation.mapLocation.lng)
			result.destination = new google.maps.LatLng(destinationStation.mapLocation.lat, destinationStation.mapLocation.lng)
		}
		if (stationDistance && stationDistance.length > 0) {
			var arrStreets = [];
			stationDistance.map(station => arrStreets = arrStreets.concat(station.streets))
			const waypoints = arrStreets.map(street => {
				return {
					location: new google.maps.LatLng(street.mapLocation.lat, street.mapLocation.lng),
					stopover: false
				}
			})
			
			result.waypoints = waypoints
			
		}
		
		return result
	}

	render() {
		return (
			<div>
				<Marker
					duration={TIME_DURATION}
					icon={{
						url: this.getIconByStatus(this.state.status), // url
						scaledSize: new google.maps.Size(30, 30),
					}}
					onClick={this.toggleOpen}
					position={this.state.mapLocation}
					labelProps={{
						labelContent: this.props.name ? this.props.name : 'label',
						labelAnchor: new google.maps.Point(this.props.name.length * 2.4, 0),
						labelStyle: {
							backgroundColor: 'yellow',
							fontSize: '10px',
						}
					}}
				>
					<div>
						{this.state.isOpen && (
							<InfoWindow onCloseClick={this.toggleOpen.bind(this)}>
								<div style={{ minWidth: MIN_WIDTH_INFO }}>
								Biển số xe: {this.props.name} <br/>
								Trọng tải: {this.props.truckLoad} <br/>
								Loại rác: {this.props.type} <br/>
								Doanh nghiệp: {this.props.organization && this.props.organization.name} <br/>
								Mô tả: {this.props.description}
								</div>
							</InfoWindow>
						)}
					</div>
				</Marker>
				{this.state.isShowDirection && this.state.directions != null && <DirectionsRenderer directions={this.state.directions} />}
			</div>
		);
	}
}

// {
// 	origin: new google.maps.LatLng(10.716563, 106.743734),
// 	destination: new google.maps.LatLng(10.6658129, 106.6660459),
// 	travelMode: google.maps.TravelMode.DRIVING,
// 	waypoints: [
// 		{
// 			location: new google.maps.LatLng(10.696704, 106.646931),
// 			stopover: false
// 		}]
// }