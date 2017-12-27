import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import OrganizationForm from '../organization-form'
import swal from 'sweetalert2'
import { createOrganization } from 'api/OrganizationApi'
import slug from 'constants/slug'
import Breadcrumb from '../breadcrumb'

export default class OrganizationCreate extends PureComponent {
  async onSubmit(data) {
    const organization = await createOrganization(data)
    if (!organization) {
      swal({
        title: organization.message
      })
    } else {
      swal({
        title: 'Khởi tạo công ty ' + organization.name + ' thành công'
      })
      this.props.history.push(slug.organization.base)
    }
  }

  render() {
    return (
      <PageContainer>
        <Breadcrumb items={['list', 'create']} />
        <OrganizationForm onSubmit={this.onSubmit} />
      </PageContainer>
    )
  }
}
