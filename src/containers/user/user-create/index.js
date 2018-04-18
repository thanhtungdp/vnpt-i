import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { message } from 'antd'
import { autobind } from 'core-decorators'
import UserApi from 'api/UserApi'
import slug from 'constants/slug'
import UserForm from '../user-form'
import Breadcrumb from '../breadcrumb'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

@protectRole(ROLE.USER.CREATE)
@autobind
export default class UserCreate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  async handleSubmit(data) {
    this.setState({
      isLoading: true
    })

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
        <UserForm
          onSubmit={this.handleSubmit}
          isLoading={this.state.isLoading}
        />
      </PageContainer>
    )
  }
}
