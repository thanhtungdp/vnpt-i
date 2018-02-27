import React from 'react'
import { autobind } from 'core-decorators'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Breadcrumb from '../breadcrumb'
import SearchFrom from '../search-form'
import { Table, Tabs, Row, Col, Button } from 'antd'
import DataStationAutoApi from 'api/DataStationAutoApi'
import {
  withHighcharts,
  HighchartsStockChart,
  Chart,
  Title,
  Subtitle,
  Legend,
  XAxis,
  YAxis,
  LineSeries
} from 'react-jsx-highstock'
import Highcharts from 'highcharts/highstock'

@autobind
class MinutesDataSearch extends React.Component {
  state = {
    dataSources: [],
    measuringList: [],
    lines: [],
    query: {},
    config: {
      multiplicationTime: 1,
      prepareExceeded: 0.9,
      exceededColor: 'red',
      prepareColor: 'orange',
      normal: 'black'
    }
  }

  async changeSearch(query) {
    var dataSources = await DataStationAutoApi.getDataStationAutos(
      { page: 1, itemPerPage: 100 },
      query
    )
    let lines = []
    let dataLines = {}
    query.measuringList.forEach(function(item) {
      dataLines[item.key] = {
        key: item.key,
        name: item.name,
        unit: item.unit,
        data: []
      }
    })
    if (dataSources) {
      let data = dataSources.data
      data.sort((a, b) => {
        return (
          new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
        )
      })
      data.forEach(function(item) {
        for (let k in item.measuringLogs)
          if (dataLines[k]) {
            if (!dataLines[k].data) dataLines[k].data = []
            dataLines[k].data.push([
              new Date(item.receivedAt).getTime(),
              item.measuringLogs[k].value
            ])
          }
      })
    }

    for (let item in dataLines) {
      let line = (
        <LineSeries
          id={dataLines[item].key}
          name={dataLines[item].name}
          data={dataLines[item].data}
        />
      )
      lines.push(line)
    }
    this.setState({
      dataSources: dataSources.data,
      measuringList: query.measuringList,
      lines,
      query
    })
  }

  getColumns() {
    var columns = [
      {
        title: 'Received at',
        dataIndex: `receivedAt`,
        key: 'receivedAt',
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
        }
      }
    ]
    var currentState = this.state
    var column1s = this.state.measuringList.map(item => ({
      title: item.name + (item.unit ? '(' + item.unit + ')' : ''),
      dataIndex: `measuringLogs.${item.key}`,
      key: item.key,
      render: (value, record) => {
        var color = currentState.config.normal
        if (value.value >= value.maxLimit * currentState.config.prepareExceeded)
          color = currentState.config.prepareColor
        if (
          value.value <= value.minLimit ||
          value.value >= value.maxLimit * currentState.config.multiplicationTime
        )
          color = currentState.config.exceededColor
        return <div style={{ color: color }}>{value.value}</div>
      }
    }))
    columns.push(...column1s)
    return columns
  }

  async downloadData() {
    DataStationAutoApi.getExportData(this.state.query)
  }

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb items={['list']} />
        <SearchFrom initialValues={{}} onChangeSearch={this.changeSearch} />
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Data" key="1">
            <Row gutter={24}>
              <Col span={24}>
                <Button
                  type="primary"
                  shape="circle"
                  icon="file-excel"
                  size={18}
                  style={{ float: 'right', margin: '5px' }}
                  onClick={this.downloadData}
                />
              </Col>
              <Col span={24}>
                <Table
                  size="small"
                  columns={this.getColumns()}
                  dataSource={this.state.dataSources}
                />
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chart" key="2">
            <Row gutter={24}>
              <Col span={24}>
                <HighchartsStockChart>
                  <Chart width={1000} />

                  <Title>Chart</Title>
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                  />

                  <XAxis type="datetime">
                    <XAxis.Title>Time</XAxis.Title>
                  </XAxis>

                  <YAxis id="number">{this.state.lines}</YAxis>
                </HighchartsStockChart>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    )
  }
}

export default withHighcharts(MinutesDataSearch, Highcharts)