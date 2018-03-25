import React from 'react'
import { autobind } from 'core-decorators'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import StationAutoApi from 'api/StationAuto'
import CategoriesApi from 'api/CategoryApi'
import Header from 'components/monitoring/head'
import StationTypeList from 'components/monitoring/station-type-group/station-type-list'
import Clearfix from 'components/elements/clearfix'

@autobind
export default class Monitoring extends React.Component {
  state = {
    isLoading: false,
    data: []
  }

  async loadData() {
    this.setState({ isLoading: false })

    // Fetch data
    let dataStationTypes = await CategoriesApi.getStationTypes({
      page: 1,
      itemPerPage: 10
    })
    let dataStationAutos = await StationAutoApi.getLastLog()

    // Caculate data
    let dataMonitoring = dataStationTypes.data.map(stationType => {
      const stationAutoList = dataStationAutos.filter(
        stationAuto => stationAuto.stationType.key === stationType.key
      )
      return {
        stationType,
        stationAutoList
      }
    })

    this.setState({
      data: dataMonitoring,
      isLoading: true
    })
  }

  startTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(this.loadData.bind(this), 60000)
    this.loadData()
  }

  stopTimer() {
    clearInterval(this.timer)
  }

  async componentWillMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  render() {
    return (
      <PageContainer backgroundColor="#fafbfb" headerCustom={<Header />}>
        <StationTypeList data={this.state.data} />
        <Clearfix height={64} />
      </PageContainer>
    )
  }
}
