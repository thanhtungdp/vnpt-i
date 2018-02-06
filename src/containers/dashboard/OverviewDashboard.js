import React, { Component } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Breadcrumb from 'shared/breadcrumb/Breadcrumb'
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket'
import styled from 'styled-components'
import Clearfix from '../../components/elements/clearfix'
import { Table } from 'antd'
import { getStationTypes } from 'api/CategoryApi'
import { getStationAutos } from 'api/StationAuto'
import { getDataStationAutos } from 'api/DataStationAutoApi'
import {
  withHighcharts,
  HighchartsChart,
  Chart,
  Title,
  Subtitle,
  Legend,
  XAxis,
  YAxis,
  LineSeries
} from 'react-jsx-highstock'
import Highcharts from 'highcharts'

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const SummaryItem = styled.div`
  flex-grow: 1;
  margin: 2px;
  width: 224px;
  height: 68px;
  opacity: 0.85;
  border-radius: 4px;
  div {
    display: flex;
    justify-content: space-between;
    margin: 5px;
  }
  .groupText {
    display: flex;
    flex-direction: column;
    color: #ffffff;
  }
  .groupText .countText {
    width: 23px;
    height: 27px;
    font-family: OpenSans;
    font-size: 20px;
    letter-spacing: -0.2px;
    text-align: left;
  }
  .groupText .itemText {
    font-size: 14px;
    letter-spacing: 0.2px;
    text-align: left;
  }
  .groupIcon {
    align-items: center;
    display: flex;
  }
`
const StationTypeImg = styled.img`
  width: 40px;
  height: 28.4px;
`
const BoxChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Heading = styled.div`
  display: flex;
  margin: 5px;
  justify-content: space-between;
  .title {
    height: 24px;
    font-family: OpenSans;
    font-size: 18px;
    letter-spacing: -0.2px;
    text-align: left;
    color: #3b3b3b;
  }
`
const AnalyticChart = styled.div`
  height: 250px;
  display: flex;
  margin: 5px;
  flex-direction: row;
  align-items: stretch;
  .tableList {
    flex-grow: 1;
  }
  .spaceChart {
    flex-grow: 2;
  }
`
const TableList = styled(Table)`
  flex-grow: 1;
`
class OverviewDashboard extends Component {
  state = {
    stationTypeList: [],
    stationCount: {},
    rows: {},
    lineSeries: {}
  }

  async componentWillMount() {
    let stationTypes = await getStationTypes({}, {})
    let stationTypeList = stationTypes.data
    let stationCount = {}
    let rows = {}
    let lineSeries = {}
    stationTypeList.map(item => {
      stationCount[item.key] = 0
      rows[item.key] = []
      lineSeries[item.key] = []
    })
    this.setState({ stationTypeList, stationCount, rows, lineSeries })
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

  renderSummary() {
    let arrayColor = ['#1dce6c', '#389bff', '#7ece23', '#e74c3c']
    let arrayIcon = [
      '/images/dashboard/cloud.png',
      '/images/dashboard/groundwater.png',
      '/images/dashboard/surfaceWater.png',
      '/images/dashboard/wasteWater.png'
    ]

    let items = this.state.stationTypeList.map((item, index) => {
      return (
        <SummaryItem
          style={{
            backgroundColor: arrayColor[index]
          }}
        >
          <div>
            <div class="groupText">
              <span class="countText">{this.state.stationCount[item.key]}</span>
              <span class="itemText">{item.name}</span>
            </div>
            <div class="groupIcon">
              <StationTypeImg src={arrayIcon[index]} />
            </div>
          </div>
        </SummaryItem>
      )
    })
    return <SummaryContainer>{items}</SummaryContainer>
  }

  getHead() {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 250
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
      }
    ]
  }

  renderBoxChart() {
    return this.state.stationTypeList.map(item => {
      return (
        <div>
          <Clearfix height={25} />
          <BoxChartContainer>
            <Heading class="heading">
              <span class="title">
                {/*{this.getStationAuto(item.key)}*/}
                {item.name}
                {' ('}
                {this.state.stationCount[item.key]}
                {')'}
              </span>
              <span>More action</span>
            </Heading>
            <AnalyticChart>
              <TableList
                scroll={{ y: 200 }}
                columns={this.getHead()}
                dataSource={this.state.rows[item.key]}
                pagination={false}
              />
              <div class="spaceChart">
                <HighchartsChart>
                  <Chart height={250} />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                  />
                  <XAxis>
                    <XAxis.Title />
                  </XAxis>
                  <YAxis id="number">
                    <LineSeries
                      id="installation"
                      name="Installation"
                      data={[1, 2, 3, 4, 3, 2]}
                    />
                  </YAxis>
                </HighchartsChart>
              </div>
            </AnalyticChart>
          </BoxChartContainer>
        </div>
      )
    })
  }

  render() {
    return (
      <PageContainer title="Welcome to dashboard login">
        <Breadcrumb icon={<BitbucketIcon label="" />} name="Dashboard" />
        {this.renderSummary()}
        {this.renderBoxChart()}
      </PageContainer>
    )
  }
}
export default withHighcharts(OverviewDashboard, Highcharts)
