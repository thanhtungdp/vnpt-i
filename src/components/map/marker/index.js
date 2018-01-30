/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from 'themes/markerIcon'
import { autobind } from 'core-decorators'
import stationStatus from 'constants/stationStatus'
const { InfoWindow } = require('react-google-maps')
import Marker from '../utils/marker-with-label-animate'
import { Table } from 'react-bootstrap'
const MIN_WIDTH_INFO = '150px'

@autobind
export default class MarkerStation extends PureComponent {
  static propTypes = {
    mapLocation: PropTypes.object,
    name: PropTypes.string,
    status: PropTypes.string,
    address: PropTypes.string,
    lastLog: PropTypes.object,
    measuringList: PropTypes.array
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
    let measuringList = this.props.measuringList
    let lastLog = this.props.lastLog
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Measuring</th>
              <th>Value</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Marker
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
                  <span> Address: {this.props.address}</span>
                  <br />
                  {this.renderTableData()}
                </div>
              </InfoWindow>
            )}
          </div>
        </Marker>
      </div>
    )
  }
}
