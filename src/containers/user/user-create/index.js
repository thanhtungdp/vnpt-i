import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { message } from 'antd'
import { autobind } from 'core-decorators'
import UserApi from 'api/UserApi'
import slug from 'constants/slug'
import UserForm from '../user-form'
import Breadcrumb from '../breadcrumb'

@autobind
export default class UserCreate extends React.PureComponent {
  async handleSubmit(data) {
      debugger
    const res = await UserApi.registerUser(data)
    if (res.success) {
      message.info('Register User success!')
      this.props.history.push(slug.user.list)
    }
    if (res.error) message.info(res.message)
  }

  render() {
    return (
      <PageContainer title="Create station type" {...this.props.wrapperProps}>
        <Breadcrumb items={['list', 'create']} />
        <UserForm onSubmit={this.handleSubmit} />
      </PageContainer>
    )
  }
}
