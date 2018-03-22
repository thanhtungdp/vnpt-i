import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import StationAutoHead from './Head'
import MeasuringList from './measuring/measuring-list'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'

const StationAutoWrapper = styled.div`
  padding: 16px 15px 16px 15px;
  transition: all 0.2s linear;
  margin-bottom: 16px;
  height: 151px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(241, 241, 241, 0.5);
`

@autobind
export default class StationAutoItem extends React.PureComponent {
  static propTypes = {
    orderNumber: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string,
    measuringList: PropTypes.array,
    lastLog: PropTypes.object
  }

  measuring_lastLog() {
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
    let { name, lastLog, orderNumber } = this.props
    let receivedAt
    if (lastLog && lastLog.receivedAt) {
      let date = new Date(lastLog.receivedAt)
      receivedAt = dateFormat(date, 'dd/mm/yyyy HH:MM')
    }
    return (
      <StationAutoWrapper>
        <StationAutoHead
          name={name}
          receivedAt={receivedAt}
          orderNumber={orderNumber}
        />
        <MeasuringList data={this.measuring_lastLog()} />
      </StationAutoWrapper>
    )
  }
}