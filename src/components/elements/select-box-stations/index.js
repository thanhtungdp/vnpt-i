import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SingleSelect from 'components/elements/single-select'
import styled from 'styled-components'
import { autobind } from 'core-decorators'
import stationType from 'constants/stationType'
import { Row, Col } from 'reactstrap'
import StationApi from 'api/StationApi'

const View = styled.div`
  display: flex;
`

const stationTypeDataItems = [
  {
    heading: 'Loại trạm',
    items: [
      { value: stationType.APPOINTMENT, content: 'Điểm hẹn' },
      { value: stationType.TRANSIT, content: 'Chung chuyển' },
      { value: stationType.BURIAL, content: 'Chôn lấp' }
    ]
  }
]

@autobind
export default class SelectBoxStations extends PureComponent {
  static propTypes = {
    query: PropTypes.object,
    labelType: PropTypes.string,
    labelStation: PropTypes.string
  }

  state = {
    station: []
  }

  async handleChangeStationType(value) {
    const stationWithType = await StationApi.getStationWithType(value, {})

    const items = stationWithType.data.map(record => ({
      content: `${record.name}`,
      value: record._id
    }))

    this.setState(
      {
        station: [
          {
            heading: 'Tên',
            items: items
          }
        ]
      },
      () => {
        this.props.onChange(this.state.station)
      }
    )
  }

  handleChangeStations(value) {
    this.setState({ value }, () => {
      this.props.onChange(this.state)
    })
  }

  render() {
    return (
      <View>
        <Row>
          <Col>
            <SingleSelect
              label={this.props.labelType}
              dataItems={stationTypeDataItems}
              onChange={this.handleChangeStationType}
            />
          </Col>
          <Col>
            <SingleSelect
              label={this.props.labelStation}
              dataItems={this.state.station}
              onChange={this.handleChangeStations}
            />
          </Col>
        </Row>
      </View>
    )
  }
}
