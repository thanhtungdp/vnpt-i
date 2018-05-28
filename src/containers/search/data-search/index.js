import React from 'react'
import { autobind } from 'core-decorators'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import DataStationAutoApi from 'api/DataStationAutoApi'
import Clearfix from 'components/elements/clearfix/index'
import { translate } from 'hoc/create-lang'
import TabList from './tab-list/index'
import Breadcrumb from './breadcrumb'
import SearchFrom from './search-form/index'
import { message, Spin } from 'antd'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'
import queryFormDataBrowser from 'hoc/query-formdata-browser'
import swal from 'sweetalert2'
import dataAnalize from './data-analize'

@protectRole(ROLE.DATA_SEARCH.VIEW)
@queryFormDataBrowser(['submit'])
@autobind
export default class MinutesDataSearch extends React.Component {
  state = {
    dataStationAuto: [],
    dataAnalizeStationAuto: [],
    measuringList: [],
    measuringData: [],
    searchFormData: {},
    lines: [],
    isLoading: false,
    isHaveData: false,
    isExporting: false,
    pagination: {
      current: 1,
      pageSize: 50
    }
  }

  handleSubmitSearch(searchFormData) {
    this.loadData(this.state.pagination, searchFormData)
  }

  async loadData(pagination, searchFormData) {
    this.setState({
      isLoading: true,
      isHaveData: true
    })

    var dataStationAuto = await DataStationAutoApi.getDataStationAutos(
      {
        page: pagination.current,
        itemPerPage: pagination.pageSize
      },
      searchFormData
    )
    if (dataStationAuto.data.length === 0) {
      swal({
        type: 'success',
        title: translate('dataSearchFrom.table.emptyText')
      })
    }

    var dataAnalizeStationAuto = await DataStationAutoApi.getDataAnalizeStationAutos(
      searchFormData
    )
    if (dataAnalizeStationAuto.success) {
      swal({
        type: 'success',
        title: translate('dataSearchFrom.table.emptyText')
      })
    }

    this.setState({
      isLoading: false,
      dataAnalizeStationAuto: dataAnalizeStationAuto.success ? dataAnalizeStationAuto.data : [],
      dataStationAuto: dataStationAuto.data,
      measuringData: searchFormData.measuringData,
      measuringList: searchFormData.measuringList,
      searchFormData: searchFormData,
      pagination: {
        ...pagination,
        total: dataStationAuto.pagination.totalItem
      }
    })
  }

  handleChangePage(pagination) {
    this.loadData(pagination, this.state.searchFormData)
  }

  async handleExportExcel() {
    this.setState({
      isExporting: true
    })
    let res = await DataStationAutoApi.getExportData(this.state.searchFormData)
    if (res.success) window.location = res.data
    else message.error(res.message)

    this.setState({
      isExporting: false
    })
  }

  render() {
    console.log(this.props.formData)
    console.log(this.props.query)
    return (
      <PageContainer {...this.props.wrapperProps} backgroundColor={'#fafbfb'}>
        <Spin
          size="large"
          tip={translate('dataSearchFrom.tab.statusExport')}
          spinning={this.state.isExporting}
        >
          <Breadcrumb items={['list']} />
          <SearchFrom
            initialValues={this.props.formData}
            measuringData={this.props.formData.measuringData}
            onSubmit={this.handleSubmitSearch}
            searchNow={this.props.formData.searchNow}
          />
          <Clearfix height={16} />
          {this.state.isHaveData ? (
            <TabList
              isLoading={this.state.isLoading}
              dataAnalizeStationAuto={this.state.dataAnalizeStationAuto}
              measuringData={this.state.measuringData}
              measuringList={this.state.measuringList}
              dataStationAuto={this.state.dataStationAuto}
              pagination={this.state.pagination}
              onChangePage={this.handleChangePage}
              onExportExcel={this.handleExportExcel}
              nameChart={this.state.searchFormData.name}
              isExporting={this.state.isExporting}
            />
          ) : null}
        
        </Spin>
      </PageContainer>
    )
  }
}
