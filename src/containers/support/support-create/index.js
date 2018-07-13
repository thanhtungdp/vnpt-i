import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { message } from 'antd'
import { autobind } from 'core-decorators'
import SupportForm from '../support-form'
import Breadcrumb from '../breadcrumb'
import SupportApi from 'api/SupportApi'

// @protectRole(ROLE.STATION_TYPE.CREATE)
@autobind
export default class SupportCreate extends React.PureComponent {
  async handleSubmit(data, cbSuccess) {
    const res = await SupportApi.sendRequest(data)
    if (res.error) {
      message.error(res.message)
    } else {
      if (cbSuccess) cbSuccess()
      message.info('send request success!')
    }
  }

  render() {
    return (
      <PageContainer title="Create support" {...this.props.wrapperProps}>
        <Breadcrumb items={['base']} />
        <SupportForm onSubmit={this.handleSubmit} />
      </PageContainer>
    )
  }
}
