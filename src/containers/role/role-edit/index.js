import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { withRouter } from 'react-router-dom'
import { autobind } from 'core-decorators'
import swal from 'sweetalert2'
import slug from 'constants/slug'
import RoleForm from 'containers/role/role-form'
import Breadcrumb from 'containers/role/breadcrumb'
import RoleApi from 'api/RoleApi'

@withRouter
@autobind
export default class RoleEdit extends PureComponent {
  static propTypes = {}

  state = {
    isLoaded: false,
    dataEdit: []
  }

  async componentWillMount() {
    const _id = this.props.match.params._id
    const record = await RoleApi.getRole(_id)
    if (record.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: record.message
      })
    } else {
      this.setState({
        isLoaded: true,
        dataEdit: record.data
      })
    }
  }

  async onSubmit(values) {
    const data = {
      name: values.name,
      description: values.description,
      menu: values.menu
    }
    const _id = this.props.match.params._id
    const record = await RoleApi.updateRole(_id, data)
    if (record.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: record.message
      })
    } else {
      swal({
        title: 'success',
        type: 'success'
      }).then(() => {
        this.props.history.push(slug.role.base)
      })
    }
  }

  render() {
    return (
      <PageContainer>
        <Breadcrumb items={['list', 'edit']} />
        {this.state.isLoaded && (
          <RoleForm
            onSubmit={this.onSubmit}
            initialValues={this.state.dataEdit}
          />
        )}
      </PageContainer>
    )
  }
}
