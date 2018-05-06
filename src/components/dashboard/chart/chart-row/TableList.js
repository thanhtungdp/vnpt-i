import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import stationStatus from 'constants/stationStatus'
import { translate } from 'hoc/create-lang'
import {
  warningLevelsNumber,
  warningLevels,
  colorLevels
} from 'constants/warningLevels'
import objectPath from 'object-path'

const Status = styled.div`
  width: 8px;
  height: 8px;
  background-color: #1dce6c;
  border-radius: 4px;
`

const Row = styled.div`
  display: flex;
  padding: 8px 0px;
  transition: all 0.2s linear;
  ${props =>
    props.isActive
      ? `
      background-color: #EFF0F0;
      > div {
        color: #0052CC;
      }
      `
      : ''} border-bottom: 1px solid rgba(241, 241, 241, .9);
  &:hover {
    background-color: rgba(241, 241, 241, 0.7);
    cursor: pointer;
  }
`

const Column = styled.div`
  ${props => (props.isTh ? 'font-weight: 600;' : '')};
`

const IndexColumn = Column.extend`
  width: 30px;
  text-align: center;
  font-weight: 600;
`

const NameColumn = Column.extend`
  flex: 1;
  padding-left: 8px;
`

const StatusColumn = Column.extend`
  width: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FILTER = {
  name: 'name',
  status: 'status'
}

const FILTER_TYPE = {
  desc: 'desc',
  asc: 'asc'
}

export default class TableListCustom extends React.PureComponent {
  static propTypes = {
    onFilter: PropTypes.func,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        key: PropTypes.string
      })
    ),
    currentItem: PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string
    }),
    onChangeItem: PropTypes.func
  }

  state = {
    stationStatus: stationStatus.GOOD,
    filter: '',
    filterType: FILTER_TYPE.asc
  }

  async componentWillMount() {}

  renderStationStatus(station) {
    if (station.status === stationStatus.DATA_LOSS)
      return '(' + translate('dashboard.dataLoss') + ')'
    if (station.status === stationStatus.NOT_USE)
      return '(' + translate('dashboard.notUse') + ')'
    return ''
  }

  getColorItem(item) {
    if (item.lastLog) {
      let warLevel = warningLevels.GOOD
      let measuringLogs = item.lastLog.measuringLogs
      for (let key in measuringLogs) {
        if (
          warningLevelsNumber[warLevel] <
          warningLevelsNumber[measuringLogs[key].warningLevel]
        )
          warLevel = measuringLogs[key].warningLevel
      }
      return colorLevels[warLevel]
    }
    return colorLevels.GOOD
  }

  sortNameList(data, key, asc = true) {
    return data.sort(function(a, b) {
      const last = objectPath.get(a, key)
      const after = objectPath.get(b, key)
      if (asc) {
        if (last < after) return -1
        if (last > after) return 1
      } else {
        if (last < after) return 1
        if (last > after) return -1
      }
      return 0
    })
  }

  handleFilter(filterColumn) {
    if (!this.state.filter || this.state.filter !== filterColumn) {
      this.setState({
        filter: filterColumn,
        filterType: FILTER_TYPE.asc
      })
    }
    if (this.state.filter === filterColumn) {
      this.setState({
        filter: filterColumn,
        filterType:
          this.state.filterType === FILTER_TYPE.asc
            ? FILTER_TYPE.desc
            : FILTER_TYPE.asc
      })
    }
  }

  cleanData() {
    return this.props.data.map(item => ({
      ...item,
      colorStatus: this.getColorItem(item)
    }))
  }

  getData() {
    let data = this.cleanData()
    const filterAsc = this.state.filterType === FILTER_TYPE.asc
    switch (this.state.filter) {
      case FILTER.name:
        data = this.sortNameList(data, 'name', filterAsc)
        break
      case FILTER.status:
        data = this.sortNameList(data, 'colorStatus', filterAsc)
        break
      default:
    }
    return data
  }

  render() {
    return (
      <div>
        <Row>
          <IndexColumn isTh>#</IndexColumn>
          <NameColumn onClick={() => this.handleFilter('name')} isTh>
            {translate('dashboard.tableList.name')}
          </NameColumn>
          <StatusColumn onClick={() => this.handleFilter('status')} isTh>
            {translate('dashboard.tableList.dataStatus')}
          </StatusColumn>
        </Row>
        {this.getData().map((item, index) => (
          <Row
            onClick={e => this.props.onChangeItem(e, item)}
            key={item.key}
            isActive={this.props.currentItem.key === item.key}
          >
            <IndexColumn>{index + 1}</IndexColumn>
            <NameColumn className="name">
              {item.name} {this.renderStationStatus(item)}{' '}
            </NameColumn>
            <StatusColumn>
              {' '}
              <Status
                style={{
                  backgroundColor: item.colorStatus
                }}
              />
            </StatusColumn>
          </Row>
        ))}
      </div>
    )
  }
}
