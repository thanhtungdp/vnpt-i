import React from 'react'
import { autobind } from 'core-decorators'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import StationAutoApi from 'api/StationAuto'
import CategoriesApi from 'api/CategoryApi'
import Clearfix from 'components/elements/clearfix'
import HeadItem from 'components/monitoring/head'
import StationTypeList from 'components/monitoring/station-type-group/station-type-list'

@autobind
export default class Monitoring extends React.Component {
  state = {
    isLoading: false,
    data: []
  }

  async loadData() {
    this.setState({ isLoading: false })
    let dataStationTypes = await CategoriesApi.getStationTypes(
      { page: 1, itemPerPage: 10 },
      {}
    )

    let stationAutos = await StationAutoApi.getLastLog()
    let dataMonitoring = []
    dataStationTypes.data.forEach(stationType => {
      let stationAutoList = []
      for (let i = 0; i < stationAutos.length; i++) {
        let stationAuto = stationAutos[i]
        if (stationAuto.stationType.key === stationType.key)
          stationAutoList.push(stationAuto)
      }
      dataMonitoring.push({ stationType, stationAutoList })
    })
    this.setState({
      data: dataMonitoring
    })
    this.setState({ isLoading: true })
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
      <PageContainer backgroundColor="#fafbfb" hideTitle>
        <HeadItem />
        <Clearfix />
        <StationTypeList data={this.state.data} />
      </PageContainer>
    )
  }
}
