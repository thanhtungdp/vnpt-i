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
import withSize from 'react-sizes'
import moment from 'moment/moment'
import { translate } from 'hoc/create-lang'

const TabChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
@withSize(({ width }) => ({ windowWidth: width - 450 }))
@autobind
export class TabChart extends React.PureComponent {
  static propTypes = {
    getChart: PropTypes.func,
    dataStationAuto: PropTypes.array,
    measuringData: PropTypes.array,
    nameChart: PropTypes.string
  }

  getDataSort() {
    return this.props.dataStationAuto.sort((a, b) => {
      return a._id - b._id
    })
  }

  getDataForMeasuring(measuringKey) {
    return this.getDataSort()
      .map(stationAuto => {
        if (stationAuto[measuringKey]) {
          return [
            stationAuto._id - new Date().getTimezoneOffset() * 60000,
            stationAuto[measuringKey]
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

  getChart(chart) {
    this.chart = chart
  }

  render() {
    return (
      <TabChartWrapper>
        <HighchartsStockChart callback={this.getChart}>
          <Chart width={800} zoomType="x" />
          <Title>{this.props.nameChart ? this.props.nameChart : 'Chart'}</Title>
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />

          <RangeSelector>
            <RangeSelector.Button type="all">
              {translate('chart.all')}
            </RangeSelector.Button>
            <RangeSelector.Input
              boxBorderColor="#7cb5ec"
              boxWidth={150}
              inputDateParser={value => {
                return moment.utc(value, 'DD. MMM hh:mm').valueOf()
              }}
              editDateFormat="%e. %b %H:%M"
              dateFormat="%e. %b %H:%M"
            />
          </RangeSelector>

          <XAxis
            type="datetime"
            dateTimeLabelFormats={{
              hour: '%e. %b %H:%M',
              minute: '%e. %b %H:%M'
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
      </TabChartWrapper>
    )
  }
}

export default withHighcharts(TabChart, Highcharts)
