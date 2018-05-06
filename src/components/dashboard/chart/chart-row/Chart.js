import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import {
  withHighcharts,
  HighchartsStockChart,
  Chart,
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

const ChartWrapper = styled.div``

@chartAutoResize
@autobind
export class ChartRowToChart extends React.PureComponent {
  static propTypes = {
    dataLines: PropTypes.object
  }

  getDataLines() {
    return Object.keys(this.props.dataLines)
      .map(key => this.props.dataLines[key])
      .map(line => (
        <LineSeries
          id={line.key}
          key={line.key}
          name={line.name + (line.unit ? '(' + line.unit + ')' : '')}
          data={line.data}
        />
      ))
  }

  getChart(chart) {
    this.chart = chart
  }

  getCurrentChart() {
    return this.chart
  }

  render() {
    return (
      <ChartWrapper>
        <HighchartsStockChart callback={this.getChart}>
          <Chart height={250} zoomType="x" />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          <RangeSelector allButtonsEnabled={true}>
            {
              <RangeSelector.Button type="all">
                {translate('chart.all')}
              </RangeSelector.Button>
            }
            <RangeSelector.Input
              boxBorderColor="#7cb5ec"
              boxWidth={150}
              inputDateParser={value => {
                //  return moment.utc(value, 'DD. MMM hh:mm').valueOf()
                return moment.utc(value, 'YYYY/mm/dd hh:mm').valueOf()
              }}
              editDateFormat="%Y/%m/%d:%k:%M"
              dateFormat="%Y/%m/%d %k:%M"
            />
          </RangeSelector>
          <XAxis
            type="datetime"
            dateTimeLabelFormats={{
              hour: '%Y/%m/%d %k:%M',
              minute: '%Y/%m/%d %k:%M'
            }}
          >
            <XAxis.Title />
          </XAxis>
          <YAxis id="number">{this.getDataLines()}</YAxis>
          <Tooltip />
        </HighchartsStockChart>
      </ChartWrapper>
    )
  }
}
// disable button Zoom
Highcharts.setOptions({
  lang: { rangeSelectorZoom: '' }
})
// ReadOnly input text
Highcharts.wrap(Highcharts.RangeSelector.prototype, 'drawInput', function(
  proceed,
  name
) {
  proceed.call(this, name)
  this[name + 'DateBox'].on('click', function() {})
})

export default withHighcharts(ChartRowToChart, Highcharts)
