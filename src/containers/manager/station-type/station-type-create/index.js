import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { message } from 'antd'
import { autobind } from 'core-decorators'
import CategoryApi from 'api/CategoryApi'
import slug from 'constants/slug'
import StationTypeForm from '../station-type-form'
import Breadcrumb from '../breadcrumb'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

@protectRole(ROLE.STATION_TYPE.CREATE)
@autobind
export default class StationTypeCreate extends React.PureComponent {
  async handleSubmit(data) {
    const res = await CategoryApi.createStationType(data)
    if (res.success) {
      message.info('Add success!')
      this.props.history.push(slug.stationType.list)
    }
  }

  render() {
    return (
      <PageContainer title="Create station type" {...this.props.wrapperProps}>
        <Breadcrumb items={['list', 'create']} />
        <StationTypeForm onSubmit={this.handleSubmit} />
      </PageContainer>
    )
  }
}
