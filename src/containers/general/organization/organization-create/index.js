import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import swal from 'sweetalert2'
import { createOrganization } from 'api/OrganizationApi'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'

import Breadcrumb from '../breadcrumb'
import OrganizationForm from '../organization-form/index'

@autobind
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
      console.log('create')
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
