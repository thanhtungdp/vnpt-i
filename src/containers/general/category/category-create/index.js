import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { createCategory } from 'api/CategoryApi'
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import CategoriesForm from '../category-form/index'
import Breadcrumb from '../breadcrumb'

@withRouter
@autobind
export default class CategoriesCreate extends PureComponent {
  static propTypes = {}

  async handleSubmit(data) {
    const category = await createCategory(data)
    const context = this
    if (category.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: category.message
      })
    } else {
      swal({
        title: 'Tạo chuyên mục thành công',
        type: 'success'
      }).then(() => {
        context.props.history.push(slug.category.base)
      })
    }
  }

  render() {
    return (
      <PageContainer title="Tạo chuyên mục">
        <Breadcrumb items={['list', 'create']} />
        <CategoriesForm onSubmit={this.handleSubmit} />
      </PageContainer>
    )
  }
}
