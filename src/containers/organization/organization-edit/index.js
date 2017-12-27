import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import OrganizationForm from '../organization-form'
import { getOneOrganizations, updateOrganizations } from 'api/OrganizationApi'
import swal from 'sweetalert2'

export default class OrganizationCreate extends PureComponent {
  state = {
    loaded: false,
    submitting: false,
    formValues: {}
  }
  static propTypes = {}

  async componentDidMount() {
    const _id = this.props.match.params._id
    const organization = await getOneOrganizations({ _id })
    this.setState({
      loaded: true,
      formValues: organization
    })
  }

  async onSubmit(values) {
    const organization = await updateOrganizations({
      _id: this.props.match.params._id,
      name: values.name,
      address: values.address,
      description: values.description,
      director: values.director
    })
    if (!organization || organization.error) {
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
