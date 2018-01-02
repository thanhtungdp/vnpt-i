/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'themes/markerIcon';
import { autobind } from 'core-decorators'
import carStatus from 'constants/carStatus'
const { InfoWindow } = require('react-google-maps');
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
		status: PropTypes.string
	};

	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			mapLocation: props.mapLocation,
			status: carStatus.WARNING,
			indexLocation: 0
		}
	}

	toggleOpen() {
		this.setState({ isOpen: !this.state.isOpen });
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
								<div style={{ minWidth: MIN_WIDTH_INFO }}>{this.props.name}</div>
							</InfoWindow>
						)}
					</div>
				</Marker>
			</div>
		);
	}
}