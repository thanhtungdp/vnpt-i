import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import OrganizationForm from '../organization-form'
import Icon from 'themes/icon'
import swal from 'sweetalert2'
import { createOrganization } from 'api/OrganizationApi'
import slug from 'constants/slug'

export default class OrganizationCreate extends PureComponent {
  async onSubmit(data) {
    const organization = await createOrganization(data)
    if (!organization) {
      swal({
        title: organization.message
      })
    } else {
      swal({
        title: 'Khởi tạo công ty ' + organization.name + ' thành côgn'
      })
      this.props.history.push(slug.organization.base)
    }
  }

  render() {
    return (
      <PageContainer icon={Icon.create} title="Tạo mới doanh nghiệp">
        <OrganizationForm onSubmit={this.onSubmit} />
      </PageContainer>
    )
  }
}
