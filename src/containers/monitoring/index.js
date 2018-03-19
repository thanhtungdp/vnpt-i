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
  async loadData() {
    let dataStationTypes = await CategoriesApi.getStationTypes(
      { page: 1, itemPerPage: 10 },
      {}
    )
    let stationAutos = await StationAutoApi.getLastDataStationAuto(
      { page: 1, itemPerPage: 100 },
      {}
    )
    this.setState({
      stationTypes: dataStationTypes.data,
      stationAutos: stationAutos
    })
    this.setState({ isLoading: true })
  }

  state = {
    isLoading: true,
    stationTypes: [],
    stationAutos: []
  }

  async componentWillMount() {
    this.loadData()
  }

  render() {
    return (
      <PageContainer backgroundColor="#fafbfb" hideTitle>
        <HeadItem />
        <Clearfix />
        <StationTypeList
          stationTypes={this.state.stationTypes}
          stationAutos={this.state.stationAutos}
        />
      </PageContainer>
    )
  }
}
