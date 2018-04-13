import React, { Component } from 'react'
import Page from '@atlaskit/page'
import styled from 'styled-components'
import createProtectedAuth from 'hoc/protected-auth'
import Header from './Header'
import NavigationLayout from '../navigation-layout'

const Wrapper = styled.div`
  .euVEHb {
    display: none;
  }
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
export default class PageWrapperMapLayout extends Component {
  render() {
    return (
      <Wrapper>
        <Page navigation={<NavigationLayout hide />}>
          <Header />
          <Clearfix />
          <PaddingWrapper>{this.props.children}</PaddingWrapper>
        </Page>
      </Wrapper>
    )
  }
}
