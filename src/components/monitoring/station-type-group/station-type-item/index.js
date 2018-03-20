import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Heading from 'components/elements/heading'
import { Menu, Dropdown, Icon } from 'antd'
import StationAutoList from './station-auto-list'
// import Measuring from './Measuring'
// import slug from 'constants/slug'

const StationTypeWrapper = styled.div`
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
    stationType: PropTypes.object,
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
    const { stationType, stationAutoList } = this.props
    return (
      stationAutoList.length > 0 && (
        <StationTypeWrapper>
          <Heading rightChildren={this.rightChildren()}>
            {stationType.name} ({stationAutoList.length})
          </Heading>
          <StationAutoList stationAutoList={stationAutoList} />
        </StationTypeWrapper>
      )
    )
  }
}
