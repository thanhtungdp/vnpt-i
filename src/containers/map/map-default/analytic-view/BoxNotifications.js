import React from 'react'
import { autobind } from 'core-decorators'
import BoxLayout from 'components/map/box-white-layout'
import NotificationList from 'components/map/notification-list'
import notifications from 'fake-data/notifications'
import NotificationsApi from 'api/NotificationApi'
import styled from 'styled-components'
import connectWindowHeight from '../../hoc-window-height'
import { Icon } from 'antd'

const Wrapper = styled.div`
  height: ${props => props.height}px;
  overflow-y: ${this.state &&
  this.state.notifications &&
  this.state.notifications.length > 0
    ? 'scroll'
    : 'inherit'};
`
const Nodata = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

@connectWindowHeight
@autobind
export default class BoxNotifications extends React.PureComponent {
  state = {
    notifications: [],
    isLoading: false
  }

  async loadData() {
    this.setState({ isLoading: false })
    // Fetch data
    try {
      let result = await NotificationsApi.getNotification()
      if (result && result.success) {
        this.setState({
          notifications: result.data,
          isLoading: true
        })
      } else {
        this.setState({
          isLoading: true
        })
      }
    } catch (e) {
      this.setState({
        isLoading: true
      })
    }
  }

  startTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(this.loadData.bind(this), 5000)
    this.loadData()
  }

  stopTimer() {
    clearInterval(this.timer)
  }

  async componentWillMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  render() {
    const height = this.props.windowHeight - 270
    return (
      <BoxLayout noPadding style={{ flex: 1 }} title="Notifications">
        <Wrapper height={height}>
          {this.state.notifications.length == 0 && (
            <Nodata>
              <span>
                {' '}
                <Icon type="warning" />Nodata
              </span>
            </Nodata>
          )}

          {this.state.notifications.length > 0 && (
            <NotificationList notifications={this.state.notifications} />
          )}
        </Wrapper>
      </BoxLayout>
    )
  }
}
