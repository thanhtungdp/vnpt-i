import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { Button, Icon } from 'antd'
import { autobind } from 'core-decorators'
import UserApi from 'api/UserApi'
import UserForm from '../user-form'
import slug from '/constants/slug'
import createManagerEdit from 'hoc/manager-edit'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'

@createManagerEdit({
  apiUpdate: UserApi.updateOne,
  apiGetByKey: UserApi.getOne
})
@autobind
export default class UserEdit extends React.PureComponent {
  static propTypes = {
    onDeleteItem: PropTypes.func,
    onUpdateItem: PropTypes.func,
    getItem: PropTypes.func,
    isLoaded: PropTypes.bool
  }

  async handleSubmit(data) {
    this.props.onUpdateItem(data, this.props.history.push(slug.user.list))
  }

  //Su kien truoc khi component duoc tao ra
  async componentWillMount() {
    this.props.getItem()
  }

  cleanData() {
    return {
      ...this.props.data
    }
  }

  // Su kien xoa measuring
  deleteStationType() {
    const key = this.props.match.params.key
    this.props.onDeleteItem(key, () => {
      this.props.history.push(slug.stationType.list)
    })
  }

  buttonDelete() {
    return (
      <div>
        <Button type="primary" onClick={this.deleteStationType}>
          <Icon type="delete" />Delete
        </Button>
      </div>
    )
  }

  render() {
    return (
      <PageContainer button={this.buttonDelete()} {...this.props.wrapperProps}>
        <Breadcrumb
          items={[
            'list',
            {
              id: 'edit',
              name: this.props.isLoaded ? this.cleanData().data.username : null
            }
          ]}
        />
        {this.props.isLoaded &&
          this.props.data && (
            <UserForm
              initialValues={this.props.data}
              onSubmit={this.handleSubmit}
              isEdit
            />
          )}
      </PageContainer>
    )
  }
}
