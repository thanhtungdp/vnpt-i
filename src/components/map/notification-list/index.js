import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import NotificationItem from './NotificationItem'

const NotficationListWrapper = styled.div`
  height: 100%;
  .notificationItem {
    padding: 8px 16px;
    border-bottom: 1px solid #eee;
    &:hover {
      background-color: #fafbfb;
      cursor: pointer;
    }
  }
`

@autobind
export default class NotficationList extends React.PureComponent {
  static propTypes = {
    notifications: PropTypes.arrayOf(
      PropTypes.shape(NotificationItem.propTypes)
    )
  }

  render() {
    return (
      <NotficationListWrapper>
        {this.props.notifications.map((nf, index) => (
          <div className="notificationItem">
            <NotificationItem {...nf} key={index} />
          </div>
        ))}
      </NotficationListWrapper>
    )
  }
}
