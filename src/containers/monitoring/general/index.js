import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { autobind } from 'core-decorators'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import StationAutoApi from 'api/StationAuto'
import CategoriesApi from 'api/CategoryApi'
import Header from 'components/monitoring/head'
import objectPath from 'object-path'
import HeaderFilter from 'components/monitoring/filter'
import StationTypeList from 'components/monitoring/station-type-group/station-type-list'
import monitoringFilter from 'constants/monitoringFilter'
import ListLoaderCp from 'components/content-loader/list-loader'
import Clearfix from 'components/elements/clearfix'
import { getMonitoringFilter, setMonitoringFilter } from 'utils/localStorage'
import { replaceVietnameseStr } from 'utils/string'
import {
  GROUP_OPTIONS,
  ORDER_OPTIONS
} from 'components/monitoring/filter/options'
import createContentLoader from 'hoc/content-loader'
import { translate } from 'hoc/create-lang'

const ListLoader = createContentLoader({
  component: <ListLoaderCp />,
  isAutoLoader: true,
  items: 5
})(null)

export const defaultFilter = {
  group: GROUP_OPTIONS[0].value,
  order: ORDER_OPTIONS[0].value,
  stationType: '',
  search: ''
}

@withRouter
@autobind
export default class MonitoringGeneral extends React.Component {
  state = {
    isLoading: false,
    isLoadedFirst: false,
    filter: getMonitoringFilter() ? getMonitoringFilter() : defaultFilter,
    data: []
  }

  appendWarningLevelStationAuto(stationAutoList) {
    return stationAutoList.map(stationAuto => {
      let totalWarning = 0
      if (stationAuto.lastLog && stationAuto.lastLog.measuringLogs) {
        const measuringLogs = stationAuto.lastLog.measuringLogs
        Object.keys(measuringLogs).forEach(key => {
          if (measuringLogs[key].warningLevel) {
            totalWarning++
          }
        })
      }
      return {
        ...stationAuto,
        totalWarning
      }
    })
  }

  getTotalWarning(stationAutoList) {
    let totalWarning = 0
    stationAutoList.forEach(item => {
      totalWarning += item.totalWarning
    })
    return totalWarning
  }

  async loadData() {
    this.setState({ isLoading: false })

    const stationType = queryString.parse(this.props.location.search)

    // Fetch data
    let query = {
      key: stationType.Id
    }
    let dataStationTypes = await CategoriesApi.getStationTypes(
      {
        page: 1,
        itemPerPage: 10
      },
      query
    )
    let dataStationAutos = await StationAutoApi.getLastLog()

    // Caculate data
    let dataMonitoring = []
    if (dataStationAutos.success)
      dataMonitoring = dataStationTypes.data.map(stationType => {
        const stationAutoList = dataStationAutos.data.filter(
          stationAuto => stationAuto.stationType.key === stationType.key
        )
        return {
          stationType,
          stationAutoList: this.appendWarningLevelStationAuto(stationAutoList),
          totalWarning: this.getTotalWarning(
            this.appendWarningLevelStationAuto(stationAutoList)
          )
        }
      })
    this.setState({
      data: dataMonitoring.length > 0 ? dataMonitoring : this.state.data,
      isLoading: true
    })
  }

  startTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(this.loadData.bind(this), 60000)
  }

  stopTimer() {
    clearInterval(this.timer)
  }

  async componentWillMount() {
    if (this.props.location) {
      const query = queryString.parse(this.props.location.search)
      if (query)
        this.handleChangeFilter({ ...this.state.filter, stationType: query.Id })
    }
    await this.loadData()
    this.setState({
      isLoadedFirst: true
    })
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  handleChangeFilter(filter) {
    this.setState({ filter })
    setMonitoringFilter(filter)
  }

  renderHeader() {
    return (
      <Header>
        <HeaderFilter
          filter={this.state.filter}
          onChange={this.handleChangeFilter}
        />
      </Header>
    )
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

  unGroupStation(stationTypeList) {
    if (stationTypeList.length === 0) return []
    let newStationAutoList = []
    stationTypeList.forEach(stationType => {
      stationType.stationAutoList.forEach(stationAuto => {
        newStationAutoList = [...newStationAutoList, stationAuto]
      })
    })
    if (this.state.filter.order === monitoringFilter.ORDER.NAME) {
      newStationAutoList = this.sortNameList(newStationAutoList, 'name')
    }
    return [
      {
        stationType: {
          ...stationTypeList[0],
          name: translate('dataSearchFrom.form.all')
        },
        stationAutoList: newStationAutoList
      }
    ]
  }

  getFuseFilter(dataList) {
    if (!this.state.filter.search) return dataList
    return dataList.map(station => {
      return {
        ...station,
        stationAutoList: station.stationAutoList.filter(
          stationAuto =>
            replaceVietnameseStr(stationAuto.name)
              .toLowerCase()
              .indexOf(
                replaceVietnameseStr(this.state.filter.search).toLowerCase()
              ) > -1
        )
      }
    })
  }

  getData() {
    let stationTypeList = this.getFuseFilter(this.state.data)
    // filter by STATION TYPE
    if (this.state.filter.stationType) {
      stationTypeList = stationTypeList.filter(
        stationType =>
          stationType.stationType.key === this.state.filter.stationType
      )
    }
    // filter by UNGROUP
    if (this.state.filter.group === monitoringFilter.GROUP.UNGROUP) {
      stationTypeList = this.unGroupStation(stationTypeList)
    }

    // filter by ORDER NAME
    if (this.state.filter.order === monitoringFilter.ORDER.NAME) {
      stationTypeList = this.sortNameList(
        stationTypeList,
        'stationType.name'
      ).map(stationType => {
        return {
          ...stationType,
          stationType: stationType.stationType,
          stationAutoList: this.sortNameList(
            stationType.stationAutoList,
            'name'
          )
        }
      })
    }

    // filter by values
    if (this.state.filter.order === monitoringFilter.ORDER.NUMBER) {
      stationTypeList = this.sortNameList(stationTypeList, 'totalWarning').map(
        stationType => {
          return {
            ...stationType,
            stationType: stationType.stationType,
            stationAutoList: this.sortNameList(
              stationType.stationAutoList,
              'totalWarning',
              false
            )
          }
        }
      )
    }

    return stationTypeList
  }

  render() {
    return (
      <PageContainer
        isLoading={!this.state.isLoadedFirst}
        backgroundColor="#fafbfb"
        headerCustom={this.renderHeader()}
        componentLoading={
          <div>
            <ListLoader />
          </div>
        }
      >
        <StationTypeList filter={this.state.filter} data={this.getData()} />
        <Clearfix height={64} />
      </PageContainer>
    )
  }
}
