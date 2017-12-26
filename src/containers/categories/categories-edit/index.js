import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import CategoriesForm from '../categories-form'
import Icon from 'themes/icon'
import { getCategory, putCategories } from 'api/CategoriesApi'
import swal from 'sweetalert2'

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

  async handleSubmit(values) {
    const record = await putCategories({
      name: values.name,
      description: values.description,
      type: values.type,
      parentCode: values.parentCode === undefined ? '' : values.parentCode
    }, values.code)

    if (record.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: record.message
      })
    } else {
      swal({
        title: 'Success',
        type: 'success'
      })
    }
  }

  render() {
    return (
      <PageContainer icon={Icon.create} title="Sửa chuyên mục">
        {this.state.loaded && (
          <CategoriesForm
            onSubmit={this.handleSubmit}
            initialValues={this.state.dataEdit}
          />
        )}
      </PageContainer>
    )
  }
}
