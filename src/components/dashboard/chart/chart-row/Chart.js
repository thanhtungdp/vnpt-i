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

const ChartWrapper = styled.div``

@autobind
export default class ChartOverview extends React.PureComponent {
  render() {
    return (
      <ChartWrapper>
        <HighchartsChart>
          <Chart height={250} />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          <XAxis>
            <XAxis.Title />
          </XAxis>
          <YAxis id="number">
            <LineSeries id="COD" name="COD" data={[1, 2, 3, 4, 3, 2]} />
          </YAxis>
        </HighchartsChart>
      </ChartWrapper>
    )
  }
}
