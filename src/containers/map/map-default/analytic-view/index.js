import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import BoxAnalyticList from './BoxAnalyticList'
import BoxNotifications from './BoxNotifications'

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
  render() {
    return (
      <SidebarListWrapper>
        <BoxAnalyticList />
        <Clearfix />
        <BoxNotifications />
      </SidebarListWrapper>
    )
  }
}
