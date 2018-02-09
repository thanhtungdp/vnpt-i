import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import {
  HighchartsChart,
  Chart,
  Title,
  Subtitle,
  Legend,
  XAxis,
  YAxis,
  LineSeries
} from 'react-jsx-highstock'
import PropTypes from 'prop-types'

const ChartWrapper = styled.div``

@autobind
export default class ChartOverview extends React.PureComponent {
  static propTypes = {
    dataLines: PropTypes.object
  }
  getDataLines() {
    let lines = []
    let dataLines = this.props.dataLines
    for (let item in dataLines) {
      let line = (
        <LineSeries
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
    return lines
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
          <YAxis id="number">
            {this.getDataLines()}
          </YAxis>
        </HighchartsChart>
      </ChartWrapper>
    )
  }
}
