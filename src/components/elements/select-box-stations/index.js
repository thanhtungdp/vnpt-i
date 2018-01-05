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
    dataStation: [],
    staionValue: {},
    typeValue: {}
  }

  async handleChangeStationType(object) {
    const stationWithType = await StationApi.getStationWithType(
      object.value,
      {}
    )
    const items = stationWithType.data.map(record => ({
      ...record,
      content: `${record.name}`,
      value: record._id
    }))

    this.setState(
      {
        dataStation: [
          {
            heading: 'Tên',
            items: items
          }
        ],
        staionValue: object
      },
      () => {
        this.props.onChange(
          {
            type: this.state.typeValue,
            station: this.state.staionValue
          }
        )
      }
    )
  }

  handleChangeStations(Object) {
    this.setState(
      {
        typeValue: Object
      },
      () => {
        this.props.onChange(
          {
            type: this.state.typeValue,
            station: this.state.staionValue
          }
        )
      }
    )
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
              dataItems={this.state.dataStation}
              onChange={this.handleChangeStations}
            />
          </Col>
        </Row>
      </View>
    )
  }
}
