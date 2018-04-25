import React, { Component } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import SummaryList from 'components/dashboard/summary/summary-list'
import ChartList from 'components/dashboard/chart/chart-row-list'
import { getStationTypes } from 'api/CategoryApi'
import { getLastLog } from 'api/StationAuto'

export default class OverviewDashboard extends Component {
  state = {
    stationTypeList: [],
    stationCount: {},
    rows: {},
    lineSeries: {},
    isLoaded: false
  }

  async componentWillMount() {
    let stationTypes = await getStationTypes({}, {})
    let stationTypeList = stationTypes.data
    let stationCount = {}
    let rows = {}
    let lineSeries = {}
    stationTypeList.forEach(item => {
      stationCount[item.key] = 0
      rows[item.key] = []
      lineSeries[item.key] = []
    })

    let stationLastLog = await getLastLog()
    this.setState({
      stationTypeList,
      stationCount,
      rows,
      lineSeries,
      isLoaded: true
    })

    /*eslint-disable */
    for (var i = 0; i < stationTypeList.length; i++) {
      let stationAutos = stationLastLog.data.filter(item => {
        if (!item.stationType) return false
        return item.stationType.key === stationTypeList[i].key
      })

      this.setState({
        stationCount: {
          ...this.state.stationCount,
          [stationTypeList[i].key]: stationAutos.length
        },
        rows: {
          ...this.state.rows,
          [stationTypeList[i].key]: stationAutos
        }
      })
    }
    /*eslint-enable */
  }

  getSummaryList() {
    let arrayColor = [
      '#1dce6c',
      '#389bff',
      '#7ece23',
      '#e74c3c',
      '#1dce6c',
      '#389bff',
      '#7ece23',
      '#e74c3c'
    ]
    let arrayIcon = [
      '/images/dashboard/cloud.png',
      '/images/dashboard/groundwater.png',
      '/images/dashboard/surfaceWater.png',
      '/images/dashboard/wasteWater.png',
      '/images/dashboard/cloud.png',
      '/images/dashboard/groundwater.png',
      '/images/dashboard/surfaceWater.png',
      '/images/dashboard/wasteWater.png'
    ]
    return this.state.stationTypeList.map((item, index) => ({
      color: item.color ? item.color : arrayColor[index], //arrayColor[index],
      name: item.name,
      image: item.icon ? item.icon : arrayIcon[index],
      number: this.state.stationCount[item.key]
    }))
  }

  getChartList() {
    return this.state.stationTypeList.map(item => ({
      key: item.key,
      title: item.name,
      totalStation: this.state.stationCount[item.key],
      stationList: this.state.rows[item.key]
    }))
  }

  render() {
    return (
      <PageContainer
        isLoading={!this.state.isLoaded}
        backgroundColor="#fafbfb"
        hideTitle
      >
        <SummaryList data={this.getSummaryList()} />
        <ChartList data={this.getChartList()} />
      </PageContainer>
    )
  }
}
