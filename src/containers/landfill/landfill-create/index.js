import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import LandfillForm from '../landfill-form'
import Icon from 'themes/icon'
import Breadcrumb from '../breadcrumb'

export default class LandfillList extends PureComponent {
  static propTypes = {}

  onSubmit() {}

  render() {
    return (
      <PageContainer icon={Icon.create} title="Tạo bãi mới">
        <Breadcrumb items={['list', 'create']} />
        <LandfillForm onSubmit={this.onSubmit} />
      </PageContainer>
    )
  }
}
