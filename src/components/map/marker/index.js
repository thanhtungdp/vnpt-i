/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from 'themes/markerIcon'
import { autobind } from 'core-decorators'
import stationStatus from 'constants/stationStatus'

const { InfoWindow, Circle } = require('react-google-maps')
import Marker from '../utils/marker-with-label-animate'
import { Table } from 'react-bootstrap'
import DateFormat from 'dateformat'
import { colorLevels } from 'constants/warningLevels'
import stStatus from 'constants/stationStatus'
import moment from 'moment'
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
    visible: PropTypes.bool,
    stationStatus: PropTypes.string
  }
  state = {
    isOpen: false,
    tableData: ''
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  closeToggle() {
    this.setState({
      isOpen: false
    })
  }

  openToggle() {
    if (!this.state.isOpen)
      this.setState({
        isOpen: true
      })
  }

  getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas =
      this.getTextWidth.canvas ||
      (this.getTextWidth.canvas = document.createElement('canvas'))
    var context = canvas.getContext('2d')
    context.font = 'Roboto'
    var metrics = context.measureText(text)
    return metrics.width * 1.5
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
    this.setState({
      tableData: this.renderTableData()
    })
  }

  renderTableData() {
    if (!this.props.lastLog) return ''
    let lastLog = this.props.lastLog
    let measuringList = this.props.measuringList.map((item, index) => {
      return (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td
            style={{
              color: lastLog.measuringLogs[item.key]
                ? colorLevels[lastLog.measuringLogs[item.key].warningLevel]
                : colorLevels.DEFAULT
            }}
          >
            {lastLog.measuringLogs[item.key]
              ? lastLog.measuringLogs[item.key].value
              : ''}
          </td>
          <td>{item.unit}</td>
        </tr>
      )
    })
    return (
      <div>
        <span
          style={{
            color:
              this.props.stationStatus !== stStatus.DATA_LOSS
                ? 'inherit'
                : 'orange'
          }}
        >
          {this.props.stationStatus !== stStatus.DATA_LOSS
            ? 'Received at:'
            : 'Data loss at:'}{' '}
          {/* {DateFormat(new Date(lastLog.receivedAt), 'dd/mm/yyyy hh:mm:ss')} */}
          {moment(lastLog.receivedAt, "YYYY-MM-DD hh:mm").format('DD/MM/YYYY hh:mm')}
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

  getColorLevel(status) {
    if (status && status !== '') return colorLevels[status.toUpperCase()]
    else return colorLevels.GOOD
  }

  render() {
    return (
      <div>
        <Marker
          //visible={this.props.visible}
          icon={{
            // url: this.getIconByStatus(this.props.status), // url
            // scaledSize: new google.maps.Size(30, 30)
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeWeight: 1,
            strokeColor: '#00',
            fillColor: this.getColorLevel(this.props.status),
            fillOpacity: 1
          }}
          onClick={this.toggleOpen}
          position={this.props.mapLocation}
          labelProps={{
            labelContent: this.props.name
              ? this.props.stationStatus === stStatus.GOOD
                ? this.props.name
                : this.props.name + '<br/>' + this.props.stationStatus
              : 'label',
            labelAnchor: new google.maps.Point(
              this.getTextWidth(this.props.name ? this.props.name : 'label') /
                2,
              -15
            ),
            labelStyle: {
              backgroundColor: '#2ecc71',
              borderRadius: '3px',
              fontSize: '12px',
              padding: '2px',
              color: 'white',
              textAlign: 'center',
              whiteteSpace: 'nowrap',
              width:
                this.getTextWidth(this.props.name ? this.props.name : 'label') +
                'px'
            }
          }}
        >
          <div>
            {this.state.isOpen &&
              this.props.name &&
              this.props.name != '' && (
                <InfoWindow
                  ref={info => {
                    if (!info && this.state.isOpen)
                      this.setState({ isOpen: false })
                  }}
                  options={{
                    disableAutoPan: true,
                    maxWidth: 310
                  }}
                  onCloseClick={this.toggleOpen.bind(this)}
                >
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
                    {this.props.lastLog && this.state.tableData}
                  </div>
                </InfoWindow>
              )}
          </div>
        </Marker>
      </div>
    )
  }
}
