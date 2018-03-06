import React from 'react'
import { Table, Modal, Button, Tabs } from 'antd'
import Breadcrumb from './breadcrumb'
import createLanguageHoc, { langPropTypes } from '../../hoc/create-lang'
import { autobind } from 'core-decorators'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import StationAutoApi from 'api/StationAuto'
import CategoriesApi from 'api/CategoryApi'
import DataSearch from './data-search'
import ControlStation from './control-station'
import styled from 'styled-components'
import playSound from 'utils/audio'
import dateFormat from 'dateformat'
import Clearfix from 'components/elements/clearfix'

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    font-size: 20px;
  }
`

const FlexStyle = styled.div`
  display: flex;
`

@createLanguageHoc
@autobind
export default class OnlineMonitoring extends React.Component {
  constructor(props) {
    super(props)
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

  async loadData() {
    let dataStationTypes = await CategoriesApi.getStationTypes(
      { page: 1, itemPerPage: 100000 },
      {}
    )
    let stationAutos = await StationAutoApi.getLastDataStationAuto(
      { page: 1, itemPerPage: 1000000 },
      {}
    )
    this.setState({
      stationTypes: dataStationTypes.data,
      stationAutos: stationAutos
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
      trendExceededColor: 'yellow',
      normal: 'black'
    },
    isLoading: true,
    stationTypes: [],
    stationAutos: [],
    visibleControl: false,
    visibleChart: false,
    lang: langPropTypes
  }

  setModal2Visible(visibleKey, visible, record = {}) {
    console.log()
    this.setState({
      [visibleKey]: visible,
      record,
      searchData: {
        stationAuto: record.stationKey,
        stationType: record.stationType
      }
    })
  }

  renderStationTypeContainer(stationType) {
    const { t } = this.props.lang
    let columns = [
      {
        dataIndex: 'receivedAt',
        title: 'receivedAt',
        render(value, record) {
          let date = new Date(value)
          return <div>{dateFormat(date, 'dd/mm/yyyy HH:MM')}</div>
        },
        fixed: 'left'
      },
      {
        dataIndex: 'stationName',
        title: 'Station'
      }
    ]

    let dataSource = []
    let currentState = this.state
    let stations = this.state.stationAutos.filter(
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
              title:
                measuring.name + (measuring.unit ? ` (${measuring.unit})` : ''),
              render: (value, record) => {
                let color = currentState.config.normal
                if (value) {
                  if (value.status) {
                    if (value.status === 2)
                      color = currentState.config.prepareColor
                    else if (value.status === 3 || value.status === 4) {
                      color = currentState.config.exceededColor
                      playSound('audio/alarm_beep.wav')
                    } else if (value.status === 1)
                      color = currentState.config.trendExceededColor
                  }
                  return <div style={{ color: color }}>{value.value}</div>
                }
                return value
              }
            })

        })
      if (station.lastLog)
        dataSource.push({
          ...station.lastLog.measuringLogs,
          receivedAt: station.lastLog.receivedAt,
          stationName: station.name,
          stationKey: station.key,
          stationType: station.stationType.key,
          key: station.key
        })
    })
    columns.push({
      dataIndex: 'stationKey',
      render(value, record) {
        return (
          <FlexStyle>
            <Button type="primary" onClick={() => this.setModal2Visible('visibleControl', true, record)}>
              Control
            </Button>
            <Clearfix width={8}/>
            <Button type="primary" onClick={() => this.setModal2Visible('visibleChart', true, record)}>
              Chart
            </Button>
          </FlexStyle>
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
          visible={this.state.visibleChart}
          onCancel={() => this.setModal2Visible(false)}
          width={'99'}
        >
          <DataSearch initialValues={this.state.searchData} />
        </Modal>
        <Modal
          rowKey="uid1"
          title="Control station"
          wrapClassName="vertical-center-modal"
          visible={this.state.visibleControl}
          width={'50%'}
        >
          <ControlStation initialValues={this.state.searchData} />
        </Modal>
      </PageContainer>
    )
  }
}
