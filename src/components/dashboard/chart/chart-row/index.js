import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Heading from 'components/elements/heading'
import { Menu, Dropdown, Icon } from 'antd'
import TableList from './TableList'
import Chart from './Chart'
import slug from 'constants/slug'
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

const LinkSpan = styled.span`
  color: #d4d4d4;
  &:hover {
    cursor: pointer;
  }
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

  rightChilren() {
    const dropdown = (
      <Menu>
        <Menu.Item key="0">
          <a href={slug.onlineMonitoring.base}> Realtime Tracking</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href={slug.map.base}>View in map</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={dropdown} trigger={['click']}>
        <LinkSpan className="ant-dropdown-link">
          <Icon type="right" /> View more
        </LinkSpan>
      </Dropdown>
    )
  }

  render() {
    return (
      <ChartSummaryWrapper>
        <Heading rightChildren={this.rightChilren()}>
          {this.props.title} ({this.props.totalStation})
        </Heading>
        {this.props.stationList.length && (
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
        )}
      </ChartSummaryWrapper>
    )
  }
}
