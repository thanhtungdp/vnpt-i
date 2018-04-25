import React from 'react'
import Heading from 'components/elements/heading'
// import { Menu} from 'antd'
// import styled from 'styled-components'

// const LinkSpan = styled.span`
//   color: #ffffff;
//   &:hover {
//     cursor: pointer;
//   }
// `

export default class HeadStypeType extends React.Component {
  rightChildren() {
    // const dropdown = (
    //   <Menu>
    //     <Menu.Item key="0">
    //       <a> Realtime Tracking</a>
    //     </Menu.Item>
    //     <Menu.Item key="1">
    //       <a>View in map</a>
    //     </Menu.Item>
    //   </Menu>
    // )
    return (
      // <Dropdown overlay={dropdown} trigger={['click']}>
      //   <LinkSpan className="ant-dropdown-link">
      //     <Icon type="right" /> View more
      //   </LinkSpan>
      // </Dropdown>
      <div />
    )
  }

  render() {
    return (
      <Heading
        isBackground
        textColor="#ffffff"
        rightChildren={this.rightChildren()}
        fontSize={14}
        style={{
          padding: '8px 16px'
        }}
      >
        {this.props.children}
      </Heading>
    )
  }
}
