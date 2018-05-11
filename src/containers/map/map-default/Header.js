import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { SHAPE, PRIMARY } from 'themes/color'
import { Icon } from 'antd'
import styled from 'styled-components'
import sidebarType from 'constants/searchSidebarType'

const HeaderWrapper = styled.div`
  display: flex;
  border: 1px solid ${PRIMARY};
  margin-bottom: 8px;
`

const LinkA = styled.a`
  display: flex;
  padding: 8px 16px;
  width: 50%;
  position: relative;
  justify-content: center;
  ${props =>
    props.isActive
      ? `
    color: #ffffff !important;
    background-color: ${PRIMARY};
  `
      : `
    color: ${PRIMARY};
  `} &:hover {
    text-decoration: none;
    color: #ffffff !important;
    background-color: ${PRIMARY};
  }
  > i {
    font-size: 20px;
  }
`

const NotificationWrapper = styled.div`
  position: relative;
`

const BadgeNotification = styled.div`
  position: absolute;
  background: ${SHAPE.RED};
  right: -8px;
  top: -5px;
  width: 18px;
  height: 15px;
  color: #fff;
  font-size: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

@autobind
export default class Header extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    selectedType: PropTypes.string
  }

  renderItem(type, text, children) {
    return (
      <LinkA
        href="#"
        isActive={this.props.selectedType === type}
        onClick={e => this.props.onChange(e, type)}
      >
        {text}
        {children}
      </LinkA>
    )
  }

  render() {
    return (
      <HeaderWrapper>
        {this.renderItem(
          sidebarType.NORMAL,
          <Icon size={20} type="appstore-o" />
        )}
        {this.renderItem(
          sidebarType.NOTIFICATIONS,
          <NotificationWrapper>
            <Icon size={25} type="bell" />
            <BadgeNotification>100</BadgeNotification>
          </NotificationWrapper>
        )}
      </HeaderWrapper>
    )
  }
}
