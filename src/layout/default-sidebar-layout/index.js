import React, { Component } from 'react'
import Page from '@atlaskit/page'
import SidebarNavigation from './SidebarNavigation'
import createProtectedAuth from 'hoc/protected-auth'
import { connectAutoDispatch } from 'redux/connect'
import { toggleNavigation } from 'redux/actions/themeAction'
import { autobind } from 'core-decorators'

@createProtectedAuth
@connectAutoDispatch(
  state => ({
    navigationIsOpen: state.theme.navigation.isOpen
  }),
  { toggleNavigation }
)
@autobind
export default class PageWrapper extends Component {
  state = {
    navigationWidth: 304
  }

  getNavigation() {
    return {
      width: this.state.navigationWidth,
      isOpen: this.props.navigationIsOpen
    }
  }

  handleResizeNavigation({ isOpen, width }) {
    this.props.toggleNavigation(isOpen)
    this.setState({
      navigationWidth: width
    })
  }

  render() {
    return (
      <Page
        navigation={
          <SidebarNavigation
            onChangeSize={this.handleResizeNavigation}
            navigation={this.getNavigation()}
          />
        }
      >
        <div>{this.props.children}</div>
      </Page>
    )
  }
}
