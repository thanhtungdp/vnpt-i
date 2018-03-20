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
  LineSeries,
  Tooltip,
  Navigator,
  RangeSelector
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
    },
    loading: false,
    pagination: {
      current: 1,
      pageSize: 50
    }
  }

  async changeSearch(query) {
    this.setState({
      loading: true
    })
    var dataSources = await DataStationAutoApi.getDataStationAutos(
      {
        page: this.state.pagination.current,
        itemPerPage: this.state.pagination.pageSize
      },
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
    if (dataSources && dataSources.data) {
      let data = dataSources.data.map(item => item)
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
              new Date(item.receivedAt).getTime() -
                new Date().getTimezoneOffset() * 60000,
              item.measuringLogs[k].value
            ])
          }
      })
    }

    for (let item in dataLines) {
      let line = (
        <LineSeries
          key={dataLines[item].key}
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
      query,
      loading: false,
      pagination: {
        ...this.state.pagination,
        total: dataSources.pagination.totalItem
      }
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
        if (value == null) return <div />
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

  onChange(pagination) {
    this.setState(
      {
        loading: true,
        pagination: {
          ...pagination
        }
      },
      () => {
        this.changeSearch(this.state.query)
      }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.chart != null) this.chart.redraw()
  }

  getChart = chart => {
    this.chart = chart
  }

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb items={['list']} />
        <SearchFrom
          initialValues={{}}
          onChangeSearch={query => {
            this.setState(
              {
                pagination: {
                  ...this.state.pagination,
                  current: 1
                }
              },
              () => this.changeSearch(query)
            )
          }}
        />
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
                  loading={this.state.loading}
                  columns={this.getColumns()}
                  dataSource={this.state.dataSources}
                  pagination={this.state.pagination}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chart" key="2">
            <Row gutter={24}>
              <Col span={24}>
                <HighchartsStockChart callback={this.getChart}>
                  <Chart width={1000} zoomType="x" />

                  <Title>Chart</Title>
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                  />

                  <XAxis
                    type="datetime"
                    dateTimeLabelFormats={{
                      minute: '%e. %b %H:%M'
                    }}
                  >
                    <XAxis.Title>Time</XAxis.Title>
                  </XAxis>

                  <YAxis id="number">{this.state.lines}</YAxis>
                  <Tooltip />

                  {/* <Navigator>
                    <Navigator.Series seriesId="datetime" />
                  </Navigator> */}
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
