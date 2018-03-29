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
  }
  background-color: #fafbfb;
`

const Clearfix = styled.div`
  height: 8px;
`
const PaddingWrapper = styled.div`
  // padding: 16px 16px;
`

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
