import React from 'react'
import Heading from 'components/elements/heading'
import { Menu, Dropdown, Icon } from 'antd'
import styled from 'styled-components'

const LinkSpan = styled.span`
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`

export default class HeadStypeType extends React.Component {
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
    return (
      <Heading
        style={{
          background: 'linear-gradient(135deg,#1d89ce 0%,#56d2f3 100%)',
          padding: '16px 16px'
        }}
        textColor="#ffffff"
        rightChildren={this.rightChildren()}
      >
        {this.props.children}
      </Heading>
    )
  }
}
