import React from 'react'
import { autobind } from 'core-decorators'
import BoxLayout from 'components/map/box-white-layout'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SelectType, { TYPE } from './SelectType'
import AnalyticDataStatus from './AnalyticDataStatus'
import AnalyticStationStatus from './AnalyticStationStatus'

const Clearfix = styled.div`
  height: 8px;
`

@autobind
export default class BoxAnalytic extends React.PureComponent {
  static propTypes = {
    onClickNotification: PropTypes.func,
    dataStatus: PropTypes.shape(AnalyticDataStatus.propTypes)
  }

  state = {
    type: TYPE.DATA_STATUS
  }

  handleChangeType(type) {
    this.setState({ type })
  }

  render() {
    return (
      <BoxLayout
        noPadding
        noTitlePadding
        onlyTitle
        title={
          <SelectType
            value={this.state.type}
            onChange={this.handleChangeType}
          />
        }
        containerStyle={{ border: '0px' }}
      >
        <Clearfix />
        {this.state.type === TYPE.DATA_STATUS && (
          <AnalyticDataStatus {...this.props.dataStatus} />
        )}
        {this.state.type === TYPE.STATION_STATUS && (
          <AnalyticStationStatus {...this.props.dataStatus} />
        )}
      </BoxLayout>
    )
  }
}
