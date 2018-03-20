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
  Legend,
  XAxis,
  YAxis,
  LineSeries,
  Navigator,
  Tooltip
} from 'react-jsx-highstock'
import Highcharts from 'highcharts/highstock'
import dateFormat from 'dateformat'
import roundTo from 'round-to'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'

@createLanguageHoc
@autobind
class AvgDataForm extends React.Component {
  propTypes = {
    lang: langPropTypes
  }
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
    isLoading: false,
    pagination: {
      current: 1,
      pageSize: 50
    }
  }

  async changeSearch(query) {
    this.setState({ isLoading: true })

    var dataSources = await DataStationAutoApi.getDataStationAutoAVg(
      {
        page: this.state.pagination.current,
        itemPerPage: this.state.pagination.pageSize
      },
      query
    )

    var lines = []
    var dataLines = {}
    query.measuringList.forEach(function(rec) {
      dataLines[rec.key] = {
        key: rec.key,
        name: rec.name,
        unit: rec.unit,
        data: []
      }
    })
    if (dataSources && dataSources.data) {
      let data = dataSources.data.map(item => item)
      data.sort((a, b) => {
        return new Date(a._id).getTime() - new Date(b._id).getTime()
      })

      data.forEach(function(rec) {
        for (var k in rec)
          if (dataLines[k]) {
            if (!dataLines[k].data) dataLines[k].data = []
            dataLines[k].data.push([
              new Date(rec._id).getTime() -
                new Date().getTimezoneOffset() * 60000,
              rec[k]
            ])
            // dataLines[k].data.push([new Date(rec.receivedAt).getTime(), rec[k]])
          }
      })
    }

    for (let item in dataLines) {
      let line = (
        <LineSeries
          key={dataLines[item].key}
          id={dataLines[item].key}
          name={
            dataLines[item].name +
            (dataLines[item].unit ? '(' + dataLines[item].unit + ')' : '')
          }
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
      isLoading: false,
      pagination: {
        ...this.state.pagination,
        total: dataSources.pagination.totalItem
      }
    })
  }

  getColumns() {
    const { t } = this.props.lang
    var currentState = this.state
    var columns = [
      // {
      //   title: t('avgSearchFrom.list.receivedAt.label'),
      //   dataIndex: `receivedAt`,
      //   key: 'receivedAt',
      //   render(value, record) {
      //     var date = new Date(value)
      //     var format = 'dd/mm/yyyy HH'
      //     if (currentState.query.type === 'day') format = 'dd/mm/yyyy'
      //     if (currentState.query.type === 'month') format = 'mm/yyyy'
      //     return <div>{dateFormat(date, format)}</div>
      //   }
      // }
      {
        title: t('avgSearchFrom.list.receivedAt.label'),
        dataIndex: `_id`,
        key: 'receivedAt',
        render(value, record) {
          var date = new Date(value)
          var options = {
            year: 'numeric',
            month: 'numeric',
            hour12: false
          }
          if (currentState.query.type !== 'month') options.day = 'numeric'
          if (currentState.query.type < 60 * 24) options.hour = 'numeric'
          if (currentState.query.type < 60) {
            options.minute = 'numeric'
            options.second = 'numeric'
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
      dataIndex: `${item.key}`,
      key: item.key,
      render: (value, record) => {
        // var color = currentState.config.normal
        // if (value.value >= value.maxLimit * currentState.config.prepareExceeded)
        //   color = currentState.config.prepareColor
        // if (
        //   value.value <= value.minLimit ||
        //   value.value >= value.maxLimit * currentState.config.multiplicationTime
        // )
        //   color = currentState.config.exceededColor
        //   style={{ color: color }}
        return <div>{value && value != '' && roundTo(value, 2)}</div>
      }
    }))
    columns.push(...column1s)
    return columns
  }

  async downloadData() {
    DataStationAutoApi.getDataStationAutoExportAVg(this.state.query)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.chart != null) this.chart.redraw()
  }

  getChart = chart => {
    this.chart = chart
  }

  onChange(pagination) {
    this.setState(
      {
        isLoading: true,
        pagination: {
          ...pagination
        }
      },
      () => {
        this.changeSearch(this.state.query)
      }
    )
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
                  loading={this.state.isLoading}
                  size="small"
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

export default withHighcharts(AvgDataForm, Highcharts)
