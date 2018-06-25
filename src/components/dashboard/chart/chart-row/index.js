import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Heading from 'components/elements/heading'
import { Collapse } from 'reactstrap'
import { Menu, Dropdown, Icon } from 'antd'
import TableList from './TableList'
import Chart from './Chart'
import slug from 'constants/slug'
import { withHighcharts } from 'react-jsx-highstock'
import Highcharts from 'highcharts'
import { getDataStationAutos } from 'api/DataStationAutoApi'
import { translate } from 'hoc/create-lang'
import ReactGA from 'react-ga'
ReactGA.initialize('UA-36620912-2')

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

const IconToggle = styled.span`
  transition: all 0.3s linear;
  transform: rotate(-0deg);
  display: inline-block;
  margin-right: 4px;
  font-size: 10px;
  position: relative;
  top: -3px;
  ${props => (props.isOpen ? `transform: rotate(90deg);` : ``)};
`

const TextSpan = styled.span`
  &:hover {
    cursor: pointer;
  }
`

const LinkSpan = styled.span`
  color: #000;
  &:hover {
    cursor: pointer;
  }
`

@withRouter
@autobind
export class ChartSummary extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    totalStation: PropTypes.number,
    stationList: TableList.propTypes.data
  }

  state = {
    currentItem: {},
    dataLines: {},
    isFirstLoad: true,
    isOpen: true
  }

  handleChangeItem(e, item) {
    e.preventDefault()
    this.changeItem(item)
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen })
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
      { page: 1, itemPerPage: 500 },
      { key: stationAuto.key, measuringList: measuringArray }
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

  rightChilren(value) {
    const stationType = value.slice(0, 1)[0].stationType
    const dropdown = (
      <Menu>
        <Menu.Item key="0">
          <Link
            onClick={() => {
              ReactGA.event({
                category: 'Dashboard',
                action: 'View In Monitoring'
              })
            }}
            to={slug.monitoring.base + `?Id=${stationType.key}`}
          >
            {translate('dashboard.viewInMonitoring')}
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link
            onClick={() => {
              ReactGA.event({
                category: 'Dashboard',
                action: 'View In Map'
              })
            }}
            to={slug.map.base + `?Id=${stationType.key}`}
          >
            {translate('dashboard.viewInMap')}
          </Link>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={dropdown} trigger={['click']}>
        <LinkSpan className="ant-dropdown-link">
          <Icon type="right" /> {translate('dashboard.viewMore')}
        </LinkSpan>
      </Dropdown>
    )
  }

  componentDidMount() {
    if (this.props.stationList.length > 0) {
      this.changeItem(this.props.stationList[0])
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.stationList.length !== this.props.stationList.length) {
      this.changeItem(this.props.stationList[0])
    }
  }

  render() {
    if (this.props.stationList.length > 0)
      return (
        <ChartSummaryWrapper>
          <Heading rightChildren={this.rightChilren(this.props.stationList)}>
            <TextSpan onClick={this.toggleOpen}>
              <IconToggle isOpen={this.state.isOpen}>
                {' '}
                <Icon type="caret-right" />
              </IconToggle>
              {this.props.title}
            </TextSpan>
            ({this.props.totalStation})
          </Heading>
          <Collapse isOpen={this.state.isOpen}>
            <ChartWrapper>
              <TableWidth>
                <TableList
                  filter={this.state.filter}
                  filterType={this.state.filterType}
                  onFilter={this.handleFilter}
                  onChangeItem={this.handleChangeItem}
                  currentItem={this.state.currentItem}
                  data={this.props.stationList}
                />
              </TableWidth>
              <ChartWidth>
                <Chart dataLines={this.state.dataLines} />
              </ChartWidth>
            </ChartWrapper>
          </Collapse>
        </ChartSummaryWrapper>
      )
    return null
  }
}

export default withHighcharts(ChartSummary, Highcharts)
