import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import BoxAnalyticList from './BoxAnalyticList'
import BoxNotifications from './BoxNotifications'
import PropTypes from 'prop-types'

const SidebarListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Clearfix = styled.div`
  height: 8px;
`

@autobind
export default class SidebarList extends React.PureComponent {
  static propTypes = {
    fillStatusChange: PropTypes.func
  }

  render() {
    return (
      <SidebarListWrapper>
        <BoxAnalyticList
          stationsAutoList={this.props.stationsAutoList}
          fillStatusChange={this.props.fillStatusChange}
        />
        <Clearfix />
        <BoxNotifications />
      </SidebarListWrapper>
    )
  }
}
