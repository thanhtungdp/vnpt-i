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
  Tooltip,
  RangeSelector
} from 'react-jsx-highstock'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts/highstock'
import moment from 'moment/moment'
import { translate } from 'hoc/create-lang'
import chartAutoResize from 'hoc/chart-autoresize'

const TabChartWrapper = styled.div`
  display: flex;
`

const ChartWrapper = styled.div`
  flex: 1;
  .chart {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

@chartAutoResize
@autobind
export class TabChart extends React.PureComponent {
  static propTypes = {
    getChart: PropTypes.func,
    dataStationAuto: PropTypes.array,
    measuringData: PropTypes.array,
    nameChart: PropTypes.string
  }
  state = {
    isRendered: false,
    width: 0
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
          return [
            new Date(stationAuto.receivedAt).getTime() -
              new Date().getTimezoneOffset() * 60000,
            stationAuto.measuringLogs[measuringKey].value
          ]
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

  componentDidMount() {
    console.log(this.chartWrapper.offsetWidth)
    this.setState({
      width: this.chartWrapper.offsetWidth
    })
  }

  getChart(chart) {
    this.chart = chart
  }

  render() {
    return (
      <TabChartWrapper>
        <ChartWrapper innerRef={ref => (this.chartWrapper = ref)}>
          {this.state.width && (
            <HighchartsStockChart callback={this.getChart}>
              <Chart width={this.state.width - 100} zoomType="x" />
              <Title>
                {this.props.nameChart ? this.props.nameChart : 'Chart'}
              </Title>
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
              />
              <RangeSelector>
                {
                  <RangeSelector.Button type="all">
                    {translate('chart.all')}
                  </RangeSelector.Button>
                }
                <RangeSelector.Input
                  boxBorderColor="#7cb5ec"
                  boxWidth={150}
                  inputDateParser={value => {
                    return moment.utc(value, 'DD. MMM hh:mm').valueOf()
                  }}
                  editDateFormat="%Y/%m/%d:%k:%M"
                  dateFormat="%Y/%m/%d:%k:%M"
                  // editDateFormat="%e. %b %H:%M"
                  // dateFormat="%e. %b %H:%M"
                />
              </RangeSelector>
              <XAxis
                type="datetime"
                dateTimeLabelFormats={{
                  hour: '%Y/%m/%d:%k:%M',
                  minute: '%Y/%m/%d:%k:%M'
                  // hour: '%e. %b %H:%M',
                  // minute: '%e. %b %H:%M'
                }}
              >
                <XAxis.Title>{translate('chart.time')}</XAxis.Title>
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
          )}
        </ChartWrapper>
      </TabChartWrapper>
    )
  }
}

export default withHighcharts(TabChart, Highcharts)
