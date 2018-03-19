import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Heading from 'components/elements/heading'
import { Menu, Dropdown, Icon } from 'antd'
import StationAutoList from './station-auto-list'
// import Measuring from './Measuring'
// import slug from 'constants/slug'

const StationTypeWrapper = styled.div``

const ChartWrapper = styled.div`
  display: flex;
  box-shadow: 0 2px 10px 0 rgba(238, 238, 238, 0.5);
  background-color: #ffffff;
`

const LinkSpan = styled.span`
  color: #d4d4d4;
  &:hover {
    cursor: pointer;
  }
`

@autobind
export default class StationTypeSummary extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    stationAutoList: PropTypes.array
  }

  rightChildren() {
    const dropdown = (
      <Menu>
        <Menu.Item key="0">
          <a> Realtime Tracking</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a>View in map</a>
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
    const { name, stationAutoList } = this.props
    return (
      <StationTypeWrapper>
        <Heading rightChildren={this.rightChildren()}>
          {name} ({stationAutoList.length})
        </Heading>
        <StationAutoList stationAutoList />
      </StationTypeWrapper>
    )
  }
}
