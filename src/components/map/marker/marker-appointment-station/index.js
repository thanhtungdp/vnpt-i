/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'themes/markerIcon';
const { InfoWindow } = require('react-google-maps');
import Marker from '../../utils/marker-animate'
const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel');
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');

const MIN_WIDTH_INFO = '150px';
export default class MarkerAppointmentStation extends PureComponent {
	static propTypes = {
		mapLocation: PropTypes.object,
		name: PropTypes.string,
	};

	state = {
		isOpen: false,
	};

	toggleOpen() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		return (
			<div>
				<MarkerWithLabel
					position={this.props.mapLocation}
					icon={' '}
					labelAnchor={new google.maps.Point(this.props.name.length * 2.4, 0)}
					labelStyle={{
						backgroundColor: 'yellow',
						fontSize: '10px',
					}}
				>
					<div style={{minWidth: this.props.name.length * 5.5}}>{this.props.name}</div>
				</MarkerWithLabel>
				<Marker
					duration={3000}
					icon={{
						url: Icon.appointmentStation, // url
						scaledSize: new google.maps.Size(30, 30),
					}}
					onClick={this.toggleOpen.bind(this)}
					position={this.props.mapLocation}
				>
					{this.state.isOpen ? (
						<InfoWindow onCloseClick={this.toggleOpen.bind(this)}>
							<div style={{ minWidth: MIN_WIDTH_INFO }}>{this.props.name}</div>
						</InfoWindow>
					) : null}
				</Marker>
			</div>
		);
	}
}
