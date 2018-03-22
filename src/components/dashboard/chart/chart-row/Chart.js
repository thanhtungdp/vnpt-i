import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import {
  HighchartsChart,
  Chart,
  Legend,
  XAxis,
  YAxis,
  LineSeries
} from 'react-jsx-highstock'
import PropTypes from 'prop-types'

const ChartWrapper = styled.div``

@autobind
export default class ChartRowToChart extends React.PureComponent {
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

  render() {
    return (
      <ChartWrapper>
        <HighchartsChart>
          <Chart height={250} />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          <XAxis type="datetime">
            <XAxis.Title />
          </XAxis>
          <YAxis id="number">{this.getDataLines()}</YAxis>
        </HighchartsChart>
      </ChartWrapper>
    )
  }
}
