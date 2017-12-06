import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import LandfillForm from '../landfill-form'
import Icon from 'themes/icon'

export default class LandfillList extends PureComponent {
  static propTypes = {}

  onSubmit() {}

  render() {
    return (
      <PageContainer icon={Icon.create} title="Tạo bãi mới">
        <LandfillForm onSubmit={this.onSubmit} />
      </PageContainer>
    )
  }
}
