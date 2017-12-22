import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import OrganizationForm from '../organization-form'
import Icon from 'themes/icon'
import { getOneOrganizations, updateOrganizations } from 'api/OrganizationApi'
import swal from 'sweetalert2'
import slug from 'constants/slug'

export default class OrganizationCreate extends PureComponent {
  state = {
    loaded: false,
    submitting: false
  }
  static propTypes = {}

  async componentDidMount() {
    const _id = this.props.match.params._id;
    const organization = await getOneOrganizations({ _id })
    this.setState({
      loaded: true,
      name: organization.name,
      description: organization.description,
      address: organization.address,
      director: organization.director
    })
  }

  async onSubmit(values) {
    this.state.submitting = true
    const organization = await updateOrganizations({
      _id: this.props.match.params._id,
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
        title: 'Update Organization Successfull'
      })
      this.props.history.push(slug.organization.base)
    }

    this.state.submitting = false;
  }

  render() {
    return (
      <PageContainer icon={Icon.create} title="Chỉnh sửa doanh nghiệp">
        {this.state.loaded &&
          <OrganizationForm
            initialValues={{
              name: this.state.name,
              address: this.state.address,
              description: this.state.description,
              director: this.state.director
            }}
            onSubmit={this.onSubmit}
            submitting={this.state.submitting}
          />
        }

      </PageContainer>
    )
  }
}
