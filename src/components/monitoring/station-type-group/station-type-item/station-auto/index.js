import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import StationAutoHead from './Head'
import MeasuringList from './measuring/measuring-list'
import PropTypes from 'prop-types'
import moment from 'moment'

const StationAutoWrapper = styled.div`
  background-color: #ffffff;
  padding: 8px 16px;
  box-shadow: 0 4px 10px 0 rgba(241, 241, 241, 0.5);
`

@autobind
export default class StationAutoItem extends React.PureComponent {
  static propTypes = {
    orderNumber: PropTypes.number,
    key: PropTypes.string,
    name: PropTypes.string,
    measuringList: PropTypes.array,
    lastLog: PropTypes.object,
    stationID: PropTypes.string
  }

  measuringLastLog() {
    let { measuringList, lastLog } = this.props
    if (!lastLog) return
    let measuringLogs = lastLog.measuringLogs
    measuringList.forEach(item => {
      if (measuringLogs[item.key]) {
        item.value = measuringLogs[item.key].value
        item.warningLevel = measuringLogs[item.key].warningLevel
        item.maxLimit = measuringLogs[item.key].maxLimit
        item.minLimit = measuringLogs[item.key].minLimit
      }
    })
    return measuringList
  }
  render() {
    let { stationID, name, lastLog, orderNumber } = this.props
    let receivedAt = ''
    if (lastLog && lastLog.receivedAt) {
      receivedAt = moment(lastLog.receivedAt)
        .format('DD/MM/YYYY HH:MM')
        .toString()
    }
    return (
      <StationAutoWrapper className="stationAutoWrapper">
        <StationAutoHead
          name={name}
          receivedAt={receivedAt}
          orderNumber={orderNumber}
          stationID={stationID}
        />
        <MeasuringList data={this.measuringLastLog()} />
      </StationAutoWrapper>
    )
  }
}
