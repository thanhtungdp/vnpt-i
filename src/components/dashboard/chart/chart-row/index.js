import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Heading from 'components/elements/heading/index'
import TableList from './TableList'
import Chart from './Chart'

const ChartSummaryWrapper = styled.div``

const ChartWrapper = styled.div`
  display: flex;
  box-shadow: 0 2px 10px 0 rgba(238, 238, 238, 0.5);
  background-color: #ffffff;
`
const TableWidth = styled.div`
  width: 300px;
  border-right: 1px solid rgba(241, 241, 241, 0.5);
  background-color: #fafbfb;
`
const ChartWidth = styled.div`
  flex: 1;
  padding: 16px 16px 0px;
`

@autobind
export default class ChartSummary extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    totalStation: PropTypes.number,
    stationList: TableList.propTypes.data
  }

  state = {
    currentItem: {}
  }

  handleChangeItem(e, item) {
    e.preventDefault()
    console.log(item)
    this.setState({
      currentItem: item
    })
  }

  render() {
    return (
      <ChartSummaryWrapper>
        <Heading>
          {this.props.title} ({this.props.totalStation})
        </Heading>
        <ChartWrapper>
          <TableWidth>
            <TableList
              onChangeItem={this.handleChangeItem}
              currentItem={this.state.currentItem}
              data={this.props.stationList}
            />
          </TableWidth>
          <ChartWidth>
            <Chart />
          </ChartWidth>
        </ChartWrapper>
      </ChartSummaryWrapper>
    )
  }
}
