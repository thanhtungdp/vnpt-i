import React, { Component } from 'react'
import Page from '@atlaskit/page'
import styled from 'styled-components'
import createProtectedAuth from 'hoc/protected-auth'
import Header from './Header'
import SidebarNavigation from '../default-sidebar-layout/SidebarNavigation'
import { autobind } from 'core-decorators'

const Wrapper = styled.div`
  // .euVEHb {
  //   display: none;
  // }
  .iMoAjM {
    display: flex;
    flex-direction: column;
    position: reative;
    z-index: 2;
  }
  background-color: #fafbfb;
`

const Clearfix = styled.div`
  height: 8px;
`
const PaddingWrapper = styled.div``

@createProtectedAuth
@autobind
export default class PageWrapperMapLayout extends Component {
  state = {
    navigationWidth: 304,
    isOpen: false
  }

  getNavigation() {
    return {
      width: this.state.navigationWidth,
      isOpen: this.state.isOpen
    }
  }

  handleResizeNavigation({ isOpen, width }) {
    this.setState({
      navigationWidth: width,
      isOpen
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
          <Header />
          <Clearfix />
          <PaddingWrapper>{this.props.children}</PaddingWrapper>
        </Page>
      </Wrapper>
    )
  }
}
