import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Icon from 'themes/icon'
import { getCategory, updateCategory } from 'api/CategoryApi'
import swal from 'sweetalert2'
import CategoryForm from '../category-form'
import Breadcrumb from '../breadcrumb'

export default class CategoriesEdit extends PureComponent {
  static propTypes = {}

  state = {
    loaded: false,
    dataEdit: {}
  }

  async componentWillMount() {
    const _id = this.props.match.params._id
    const record = await getCategory(_id)
    this.setState({
      loaded: true,
      dataEdit: record
    })
    console.log(this.state.dataEdit)
  }

  async handleSubmit(categoryData) {
    const res = await updateCategory(categoryData._id, categoryData)
    if (res.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: res.message
      })
    } else {
      swal({
        type: 'success',
        title: 'Cập nhật thành công'
      })
    }
  }

  render() {
    return (
      <PageContainer
        icon={Icon.edit}
        title={this.state.dataEdit.name ? this.state.dataEdit.name : ''}
      >
        <Breadcrumb
          items={[
            'list',
            {
              id: 'edit',
              href: '/',
              name: this.state.dataEdit.name
            }
          ]}
        />
        {this.state.loaded && (
          <CategoryForm
            isEdit
            onSubmit={this.handleSubmit}
            initialValues={this.state.dataEdit}
          />
        )}
      </PageContainer>
    )
  }
}
