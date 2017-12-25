import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import OrganizationForm from '../organization-form'
import Icon from 'themes/icon'
import swal from 'sweetalert2'
import { createOrganizations } from 'api/OrganizationApi'
import slug from 'constants/slug'

export default class OrganizationCreate extends PureComponent {
  static propTypes = {}
  state = {
    submitting: false
  }

  async onSubmit(values) {
    this.setState({ submitting: true })
    const organization = await createOrganizations({
      name: values.name,
      address: values.address,
      description: values.description,
      director: values.director
    })
    if (!organization) {
      swal({
        title: organization.message
      })
    } else {
      swal({
        title: 'Create Organization Successfull'
      })
      this.props.history.push(slug.organization.base)
    }

    this.setState({ submitting: false })
  }

  render() {
    return (
      <PageContainer icon={Icon.create} title="Tạo mới doanh nghiệp">
        <OrganizationForm onSubmit={this.onSubmit}
          submitting={this.state.submitting}
        />
      </PageContainer>
    )
  }
}
