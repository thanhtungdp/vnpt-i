import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import CategoriesForm from '../categories-form'
import Icon from 'themes/icon'
import {postCategories} from 'api/CategoriesApi'
import swal from 'sweetalert2'

export default class CategoriesCreate extends PureComponent {
  static propTypes = {

  }

  async handleSubmit(values){
    const record = await postCategories({
      name: values.name,
      code: values.code,
      description: values.description,
      type: values.type.value,
      parentCode: values.parentCode === undefined ? "" : values.parentCode.value
    })


    if(record.error){
      swal({
        title: 'Error',
        type: 'error',
        text: record.message
      })
    }
    else{
      swal({
        title: 'Success',
        type: 'success',
      })
    }
  }

  render() {
    return (
      <PageContainer icon={Icon.create} title="Tạo chuyên mục">
        <CategoriesForm onSubmit={this.handleSubmit}/>
      </PageContainer>
    )
  }
}
