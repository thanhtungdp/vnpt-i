import React from 'react'
import { autobind } from 'core-decorators'
import BoxLayout from 'components/map/box-white-layout'
import NotificationList from 'components/map/notification-list'
import notifications from 'fake-data/notifications'
import styled from 'styled-components'
import connectWindowHeight from '../../hoc-window-height'

const Wrapper = styled.div`
  height: ${props => props.height}px;
  overflow-y: scroll;
`

@connectWindowHeight
@autobind
export default class BoxNotifications extends React.PureComponent {
  render() {
    const height = this.props.windowHeight - 270
    return (
      <BoxLayout noPadding style={{ flex: 1 }} title="Notifications">
        <Wrapper height={height}>
          <NotificationList notifications={notifications} />
        </Wrapper>
      </BoxLayout>
    )
  }
}
