import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import BoxNotifications from '../components/box-notifications'
import PropTypes from 'prop-types'

const SidebarListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

@autobind
export default class SidebarList extends React.PureComponent {
  static propTypes = {
    onClickNotificationItem: PropTypes.func
  }

  render() {
    return (
      <SidebarListWrapper className="fadeIn animated">
        <BoxNotifications
          onClickNotification={this.props.onClickNotificationItem}
        />
      </SidebarListWrapper>
    )
  }
}
