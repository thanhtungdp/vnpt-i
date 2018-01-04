import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SingleSelect from 'components/elements/single-select'
import Clearfix from 'components/elements/clearfix'
import styled from 'styled-components'
import { autobind } from 'core-decorators'
import stationType from 'constants/stationType'
import { Row, Col } from 'reactstrap'

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
    console.log(value)
    return
    const station = await this.componentSelectBoxCar.loatDataWithOrganization({
      _id: value._id
    })
    this.setState(
      {
        station: station
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  handleChangeStations(value) {
    //console.log(value)

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
              //dataItems={stationTypeDataItems}
              dataItems={stationTypeDataItems}
              onChange={this.handleChangeStationType}
            />
          </Col>
          <Col>
            <SingleSelect
              label={this.props.labelStation}
              //dataItems={stationTypeDataItems}
              dataItems={this.state.station}
              onChange={this.handleChangeStations}
              //query={{}}
            />
          </Col>
        </Row>
      </View>
    )
  }
}
