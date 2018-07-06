import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import StationAutoHead from './Head'
import MeasuringList from './measuring/measuring-list'
import PropTypes from 'prop-types'
import slug from 'constants/slug'
import stationStatus from 'constants/stationStatus'
import { translate } from 'hoc/create-lang'

const StationAutoWrapper = styled.div`
  background-color: #ffffff;
  padding: 8px 16px;
  box-shadow: 0 4px 10px 0 rgba(241, 241, 241, 0.5);
`

@withRouter
@autobind
export default class StationAutoItem extends React.PureComponent {
  static propTypes = {
    orderNumber: PropTypes.number,
    isShowStationName: PropTypes.bool,
    key: PropTypes.string,
    name: PropTypes.string,
    measuringList: PropTypes.array,
    lastLog: PropTypes.object,
    stationID: PropTypes.string,
    stationType: PropTypes.shape({
      name: PropTypes.string
    })
  }

  handleClickDataSearchWithMeasuring(measuringItem) {
    const formSearch = {
      stationType: this.props.stationType.key,
      stationAuto: this.props.stationID,
      measuringList: [measuringItem.key],
      measuringData: this.props.measuringList,
      searchNow: true
    }
    this.props.history.push(
      slug.dataSearch.base + '?formData=' + encodeURIComponent(JSON.stringify(formSearch))
    )
  }

  handleClickDataSearch() {
    const formSearch = {
      stationType: this.props.stationType.key,
      stationAuto: this.props.stationID,
      measuringList: this.props.measuringList.map(m => m.key),
      measuringData: this.props.measuringList,
      searchNow: true
    }
    this.props.history.push(
      slug.dataSearch.base + '?formData=' + encodeURIComponent(JSON.stringify(formSearch))
    )
  }

  handleClickViewMap() {
    const formSearch = {
      stationAuto: {
        ...this.props,
        mapLocation: {
          lat: this.props.mapLocation.lat,
          lng: this.props.mapLocation.long
        },
        key: this.props.stationID
      }
    }
    this.props.history.push(
      slug.map.base + '?formData=' + encodeURIComponent(JSON.stringify(formSearch))
    )
  }

  measuringLastLog() {
    let { measuringList, lastLog } = this.props
    if (!lastLog) return
    let measuringLogs = lastLog.measuringLogs
    measuringList.sort(function(a, b) {
      return a.numericalOrder - b.numericalOrder
    })
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
    let {
      stationID,
      name,
      lastLog,
      orderNumber,
      isShowStationName,
      stationType,
      options,
      status,
      _id
    } = this.props
    let receivedAt = ''
    if (lastLog && lastLog.receivedAt) {
      receivedAt = lastLog.receivedAt
      // receivedAt = moment(lastLog.receivedAt)
      //   .format('YYYY-MM-DD HH:MM')
      //   .toString()
      if (status === stationStatus.DATA_LOSS) {
        receivedAt = `${translate('monitoring.dataLoss')}  ${receivedAt}`
      }
    } else {
      receivedAt = translate('monitoring.notUse')
    }

    return (
      <StationAutoWrapper className="stationAutoWrapper">
        <StationAutoHead
          name={name}
          stationTypeName={isShowStationName ? stationType.name : null}
          receivedAt={receivedAt}
          orderNumber={orderNumber}
          stationID={stationID}
          options={options}
          status={status}
          onClickDataSearch={this.handleClickDataSearch}
          onClickViewMap={this.handleClickViewMap}
          _id={_id}
        />
        <MeasuringList
          onClickItem={this.handleClickDataSearchWithMeasuring}
          data={this.measuringLastLog()}
        />
      </StationAutoWrapper>
    )
  }
}
