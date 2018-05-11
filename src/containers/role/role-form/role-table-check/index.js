import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { connect } from 'react-redux'

const RoleTableListWrapper = styled.div``

@connect(state => ({
  roleList: state.auth.userInfo.organization.menu
}))
@autobind
export default class RoleTableList extends React.PureComponent {
  getInfo() {
    let columns = []
    let pages = []
    // Object.keys(this.props.roleList).map(rolePageKey => {
    //   pages.push(rolePageKey)
    //   Object.keys(this.props.roleList[rolePageKey].actions).map(actionKey => {
    //     if (columns.indexOf(actionKey) === -1) {
    //       columns.push(actionKey)
    //     }
    //   })
    // })
    return {
      pages,
      columns
    }
  }

  render() {
    console.log(this.getInfo())
    return <RoleTableListWrapper />
  }
}
