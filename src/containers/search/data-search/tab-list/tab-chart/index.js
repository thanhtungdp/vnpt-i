import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import {
  withHighcharts,
  HighchartsStockChart,
  Chart,
  Title,
  Legend,
  XAxis,
  YAxis,
  LineSeries,
  Tooltip
} from 'react-jsx-highstock'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts/highstock'

const TabChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

@autobind
export class TabChart extends React.PureComponent {
  static propTypes = {
    getChart: PropTypes.func,
    dataStationAuto: PropTypes.array,
    measuringData: PropTypes.array
  }

  getDataSort() {
    return this.props.dataStationAuto.sort(
      (a, b) =>
        new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
    )
  }

  getDataForMeasuring(measuringKey) {
    return this.getDataSort()
      .map(stationAuto => {
        if (stationAuto.measuringLogs[measuringKey]) {
          return (
            new Date(stationAuto.receivedAt).getTime() -
              new Date().getTimezoneOffset() * 60000,
            stationAuto.measuringLogs[measuringKey].value
          )
        }
        return null
      })
      .filter(value => value !== null)
  }

  getDataLines() {
    return this.props.measuringData.map(measuring => {
      return {
        ...measuring,
        data: this.getDataForMeasuring(measuring.key)
      }
    })
  }

  componentDidUpdate() {
    if (this.chart != null) this.chart.redraw()
  }

  getChart(chart) {
    this.chart = chart
  }

  render() {
    return (
      <TabChartWrapper>
        <HighchartsStockChart callback={this.getChart}>
          <Chart width={1000} zoomType="x" />
          <Title>Chart</Title>
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          <XAxis
            type="datetime"
            dateTimeLabelFormats={{
              minute: '%e. %b %H:%M'
            }}
          >
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>
          <YAxis id="number">
            {this.getDataLines().map(dataLine => (
              <LineSeries
                key={dataLine.key}
                id={dataLine.key}
                name={dataLine.name}
                data={dataLine.data}
              />
            ))}
          </YAxis>
          <Tooltip />
        </HighchartsStockChart>
      </TabChartWrapper>
    )
  }
}

export default withHighcharts(TabChart, Highcharts)
