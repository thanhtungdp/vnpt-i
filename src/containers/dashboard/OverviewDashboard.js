import React, { Component } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Breadcrumb from 'shared/breadcrumb/Breadcrumb'
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket'

export default class OverviewDashboard extends Component {
  render() {
    return (
      <PageContainer title="Welcome to dashboard login">
        <Breadcrumb icon={<BitbucketIcon label=""/>} name="Dashboard" />
        Chào mừng bạn đã đến với hệ thống quản lý chất thải rắn
      </PageContainer>
    )
  }
}
