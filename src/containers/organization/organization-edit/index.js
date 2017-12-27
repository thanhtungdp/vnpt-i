import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { getOrganization, updateOrganization } from 'api/OrganizationApi'
import swal from 'sweetalert2'
import OrganizationForm from '../organization-form'
import Breadcrumb from '../breadcrumb'

export default class OrganizationCreate extends PureComponent {
  state = {
    loaded: false,
    submitting: false,
    formValues: {}
  }

  async componentDidMount() {
    const _id = this.props.match.params._id
    const organization = await getOrganization(_id)
    this.setState({
      loaded: true,
      formValues: organization
    })
  }

  async onSubmit(data) {
    const organization = await updateOrganization(
      this.props.match.params._id,
      data
    )
    if (!organization) {
      swal({
        title: organization.message,
        type: 'error'
      })
    } else {
      swal({
        title: 'Update Organization Successfull',
        type: 'success'
      })
    }
  }

  render() {
    return (
      <PageContainer
        title={
          this.state.formValues.name
            ? this.state.formValues.name
            : 'loading ...'
        }
      >
        <Breadcrumb
          items={[
            'list',
            {
              id: 132,
              href: '/edit/ab',
              name: this.state.formValues.name
            }
          ]}
        />
        {this.state.loaded && (
          <OrganizationForm
            isEdit
            initialValues={this.state.formValues}
            onSubmit={this.onSubmit}
          />
        )}
      </PageContainer>
    )
  }
}
