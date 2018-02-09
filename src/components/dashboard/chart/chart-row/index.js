import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Heading from 'components/elements/heading'
import { Menu, Dropdown, Icon } from 'antd'
import TableList from './TableList'
import Chart from './Chart'
import slug from 'constants/slug'
import { getDataStationAutos } from 'api/DataStationAutoApi'

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
    currentItem: {},
    dataLines: {},
    isFirstLoad: true
  }

  handleChangeItem(e, item) {
    e.preventDefault()
    this.changeItem(item)
  }

  async changeItem(stationAuto) {
    this.setState({
      currentItem: stationAuto
    })
    if (!stationAuto.measuringList) return {}
    let dataLines = {}
    let measuringArray = []
    stationAuto.measuringList.forEach(function(item) {
      measuringArray.push(item.key)
      dataLines[item.key] = {
        key: item.key,
        name: item.name,
        unit: item.unit,
        data: []
      }
    })
    let dataSources = await getDataStationAutos(
      { page: 1, itemPerPage: 200 },
      { key: stationAuto.key, measuringArray: measuringArray }
    )
    if (dataSources) {
      let data = dataSources.data
      // OrderBy ASC of list
      data.sort((a, b) => {
        return (
          new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
        )
      })
      data.forEach(function(dataItem) {
        for (let k in dataItem.measuringLogs)
          if (dataLines[k]) {
            if (!dataLines[k].data) dataLines[k].data = []
            dataLines[k].data.push([
              new Date(dataItem.receivedAt).getTime(),
              dataItem.measuringLogs[k].value
            ])
          }
      })
    }
    this.setState({ dataLines })
  }

  firstRowSelected(item) {
    if (this.state.isFirstLoad) {
      this.changeItem(item)
      this.setState({ isFirstLoad: false })
    }
    return true
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
    if (this.props.stationList.length > 0)
      return (
        <ChartSummaryWrapper>
          <Heading rightChildren={this.rightChilren()}>
            {this.props.title} ({this.props.totalStation})
          </Heading>
          {this.firstRowSelected(this.props.stationList[0]) && (
            <ChartWrapper>
              <TableWidth>
                <TableList
                  onChangeItem={this.handleChangeItem}
                  currentItem={this.state.currentItem}
                  data={this.props.stationList}
                />
              </TableWidth>
              <ChartWidth>
                <Chart dataLines={this.state.dataLines} />
              </ChartWidth>
            </ChartWrapper>
          )}
        </ChartSummaryWrapper>
      )
    return ""
  }
}
