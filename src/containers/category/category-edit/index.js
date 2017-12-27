import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Icon from 'themes/icon'
import { getCategory, updateCategory } from 'api/CategoryApi'
import swal from 'sweetalert2'
import CategoryForm from '../category-form'

export default class CategoriesEdit extends PureComponent {
  static propTypes = {}

  state = {
    loaded: false,
    dataEdit: {}
  }

  async componentWillMount() {
    const code = this.props.match.params.code
    const record = await getCategory(code)
    this.setState({
      loaded: true,
      dataEdit: record
    })
  }

  async handleSubmit(categoryData) {
    const res = await updateCategory(this.state.dataEdit.code, categoryData)
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
