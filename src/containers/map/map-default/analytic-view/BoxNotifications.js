import React from 'react'
import { autobind } from 'core-decorators'
import BoxLayout from 'components/map/box-white-layout'
import NotificationList from 'components/map/notification-list'
import { Icon } from 'antd'
import NotificationsApi from 'api/NotificationApi'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import connectWindowHeight from '../../hoc-window-height'
import { translate } from 'hoc/create-lang'

const Wrapper = styled.div`
  height: ${props => props.height}px;
  ${props => (props.isOverflow ? `overflow-y: scroll;` : '')};
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
  static propTypes = {
    onClickNotification: PropTypes.func
  }

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
    const height = this.props.windowHeight - 230
    return (
      <BoxLayout
        noPadding
        style={{ flex: 1 }}
        title={translate('map.menuRight.notify')}
      >
        <Wrapper
          height={height}
          isOverflow={this.state.notifications.length > 0}
        >
          {this.state.notifications.length === 0 && (
            <Nodata>
              <span>
                <Icon type="bell" /> No data
              </span>
            </Nodata>
          )}
          {this.state.notifications.length > 0 && (
            <NotificationList
              onClickNotification={this.props.onClickNotification}
              notifications={this.state.notifications}
            />
          )}
        </Wrapper>
      </BoxLayout>
    )
  }
}
