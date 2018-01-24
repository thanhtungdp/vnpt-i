import React, { Component } from 'react'
import Page from '@atlaskit/page'
import SidebarNavigation from './SidebarNavigation'
import createProtectedAuth from 'hoc/protected-auth'

@createProtectedAuth
export default class PageWrapper extends Component {
  state = {
    navigationWidth: 250
  }

  render() {
    return (
      <Page
        navigationWidth={this.state.navigationWidth}
        navigation={<SidebarNavigation />}
      >
        <div>{this.props.children}</div>
      </Page>
    )
  }
}
