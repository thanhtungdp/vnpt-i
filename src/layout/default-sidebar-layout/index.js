import React, { Component } from 'react'
import Page from '@atlaskit/page'
import SidebarNavigation from './SidebarNavigation'
import createProtectedAuth from 'hoc/protected-auth'
import styled from 'styled-components'
import { connectAutoDispatch } from 'redux/connect'
import { toggleNavigation } from 'redux/actions/themeAction'
import { autobind } from 'core-decorators'

const Wrapper = styled.div`
  .zJwEi {
    min-height: 100vh;
  }
`

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
    navigationWidth: 310
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
      <Wrapper>
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
      </Wrapper>
    )
  }
}
