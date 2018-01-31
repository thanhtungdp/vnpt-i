import React from 'react'
import { Table, Modal, Button, Tabs } from 'antd'
import Breadcrumb from './breadcrumb'
import createLanguageHoc, { langPropTypes } from '../../hoc/create-lang'
import { autobind } from 'core-decorators'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import StationAutoApi from 'api/StationAuto'
import CategoriesApi from 'api/CategoryApi'
import DataSearch from './data-search'
import styled from 'styled-components'

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    font-size: 20px;
  }
`

@createLanguageHoc
@autobind
export default class OnlineMonitoring extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    var dataStationTypes = await CategoriesApi.getStationTypes(
      { page: 1, itemPerPage: 100000 },
      {}
    )
    var stationAutos = await StationAutoApi.getStationAutos(
      { page: 1, itemPerPage: 1000000 },
      {}
    )
    this.setState({
      stationTypes: dataStationTypes.data,
      stationAutos: stationAutos.data
    })
  }

  state = {
    visible: false,
    searchData: {},
    config: {
      multiplicationTime: 1,
      prepareExceeded: 0.9,
      exceededColor: 'red',
      prepareColor: 'orange',
      normal: 'black'
    },
    isLoading: true,
    stationTypes: [],
    stationAutos: [],
    lang: langPropTypes
  }

  setModal2Visible(visible, record = {}) {
    this.setState({
      visible,
      record,
      searchData: {
        stationAuto: record.stationKey,
        stationType: record.stationType
      }
    })
  }

  renderStationTypeContainer(stationType) {
    const { t } = this.props.lang
    var columns = [
      {
        dataIndex: 'receivedAt',
        title: 'receivedAt',
        render(value, record) {
          var date = new Date(value)
          var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
          }
          return (
            <div>{new Intl.DateTimeFormat('en-GB', options).format(date)}</div>
          )
        },
        fixed: 'left'
      },
      {
        dataIndex: 'stationName',
        title: 'Station'
      }
    ]

    var dataSource = []
    var currentState = this.state
    var stations = this.state.stationAutos.filter(
      item => item.stationType && item.stationType.key === stationType.key
    )
    stations.forEach(function(station) {
      if (station.measuringList)
        station.measuringList.forEach(function(measuring) {
          const existItems = columns.filter(
            item => item.dataIndex === measuring.key
          )
          if (!existItems || existItems.length === 0)
            columns.push({
              dataIndex: measuring.key,
              title: measuring.name,
              render: (value, record) => {
                var color = currentState.config.normal
                if (
                  value.value >=
                  value.maxLimit * currentState.config.prepareExceeded
                )
                  color = currentState.config.prepareColor
                if (
                  value.value <= value.minLimit ||
                  value.value >=
                    value.maxLimit * currentState.config.multiplicationTime
                )
                  color = currentState.config.exceededColor
                return <div style={{ color: color }}>{value.value}</div>
              }
            })
        })
      if (station.lastLog)
        dataSource.push({
          ...station.lastLog.measuringLogs,
          receivedAt: station.lastLog.receivedAt,
          stationName: station.name.vi,
          stationKey: station.key,
          stationType: station.stationType.key,
          key: station.key
        })
    })
    var openModal = this.setModal2Visible
    columns.push({
      dataIndex: 'stationKey',
      render(value, record) {
        return (
          <Button type="primary" onClick={() => openModal(true, record)}>
            Chart
          </Button>
        )
      }
    })

    return (
      <StyledTabs defaultActiveKey="1" key={stationType.key}>
        <Tabs.TabPane
          rowKey="uid"
          tab={stationType.name}
          stype={{ fontSize: '20px' }}
          key="1"
        >
          <Table
            rowKey="uid"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </Tabs.TabPane>
      </StyledTabs>
    )
  }

  render() {
    const { t } = this.props.lang
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb items={['list']} />
        {this.state.stationTypes.length > 0 &&
          this.state.stationTypes.map(item =>
            this.renderStationTypeContainer(item)
          )}
        <Modal
          rowKey="uid"
          title="Chart"
          wrapClassName="vertical-center-modal"
          visible={this.state.visible}
          onCancel={() => this.setModal2Visible(false)}
          width={'99vw'}
        >
          <DataSearch initialValues={this.state.searchData} />
        </Modal>
      </PageContainer>
    )
  }
}
