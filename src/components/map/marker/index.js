/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from 'themes/markerIcon'
import { autobind } from 'core-decorators'
import stationStatus from 'constants/stationStatus'

const { InfoWindow } = require('react-google-maps')
import Marker from '../utils/marker-with-label-animate'
import { Table } from 'react-bootstrap'
import DateFormat from 'dateformat'

const MIN_WIDTH_INFO = '150px'

@autobind
export default class MarkerStation extends PureComponent {
  static propTypes = {
    mapLocation: PropTypes.object,
    name: PropTypes.string,
    status: PropTypes.string,
    address: PropTypes.string,
    lastLog: PropTypes.object,
    measuringList: PropTypes.array,
    visible: PropTypes.bool
  }
  state = {
    isOpen: false
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  getIconByStatus(status) {
    switch (status) {
      case stationStatus.GOOD:
        return Icon.stationGood
      case stationStatus.EXCEEDS:
        return Icon.stationExceeds
      case stationStatus.EXCEEDS_PREPARING:
        return Icon.stationExceedsPreparing
      default:
        return Icon.stationGood
    }
  }

  componentDidMount() {}

  renderTableData() {
    let lastLog = this.props.lastLog
    let measuringList = this.props.measuringList.map((item, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>
          {lastLog.measuringLogs[item.key]
            ? lastLog.measuringLogs[item.key].value
            : ''}
        </td>
        <td>{item.unit}</td>
      </tr>
    ))
    return (
      <div>
        <span>
          Received at:{' '}
          {DateFormat(new Date(lastLog.receivedAt), 'dd/mm/yyyy hh:mm:ss')}
        </span>
        <Table striped={true} bordered condensed hover responsive={true}>
          <thead>
            <tr>
              <th>#</th>
              <th>Measuring</th>
              <th>Value</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>{measuringList}</tbody>
        </Table>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Marker
          visible={this.props.visible}
          icon={{
            url: this.getIconByStatus(this.props.status), // url
            scaledSize: new google.maps.Size(30, 30)
          }}
          onClick={this.toggleOpen}
          position={this.props.mapLocation}
          labelProps={{
            labelContent: this.props.name ? this.props.name : 'label',
            labelAnchor: new google.maps.Point(30, 0),
            labelStyle: {
              backgroundColor: '#2ecc71',
              borderRadius: '3px',
              fontSize: '12px',
              padding: '2px',
              color: 'white',
              textAlign: 'center',
              whiteteSpace: 'nowrap'
            }
          }}
        >
          <div>
            {this.state.isOpen && (
              <InfoWindow onCloseClick={this.toggleOpen.bind(this)}>
                <div style={{ minWidth: MIN_WIDTH_INFO }}>
                  <b
                    style={{
                      color: '#37B44C',
                      fontSize: 14,
                      fontWeight: 'bold',
                      paddingBottom: 4
                    }}
                  >
                    {this.props.name}
                  </b>
                  <br />
                  <span>
                    Longitude: {this.props.mapLocation.lng} - Latitude:{' '}
                    {this.props.mapLocation.lat}
                  </span>
                  <br />
                  <span> Address: {this.props.address}</span>
                  <br />
                  {this.props.lastLog && this.renderTableData()}
                </div>
              </InfoWindow>
            )}
          </div>
        </Marker>
      </div>
    )
  }
}
