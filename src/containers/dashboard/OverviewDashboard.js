import React, { Component } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import SummaryList from 'components/dashboard/summary/summary-list'
import ChartList from 'components/dashboard/chart/chart-row-list'
import { getStationTypes } from 'api/CategoryApi'
import { getStationAutos } from 'api/StationAuto'

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
    this.setState({
      stationTypeList,
      stationCount,
      rows,
      lineSeries,
      isLoaded: true
    })
    for (var i = 0; i < stationTypeList.length; i++) {
      let stationAutos = await getStationAutos(
        {},
        { stationType: stationTypeList[i].key }
      )
      this.setState({
        stationCount: {
          ...this.state.stationCount,
          [stationTypeList[i].key]: stationAutos.data.length
        },
        rows: {
          ...this.state.rows,
          [stationTypeList[i].key]: stationAutos.data
        }
      })
    }
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
    console.log(this.state.stationTypeList)
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
      <PageContainer backgroundColor="#fafbfb" hideTitle>
        <SummaryList data={this.getSummaryList()} />
        <ChartList data={this.getChartList()} />
      </PageContainer>
    )
  }
}
