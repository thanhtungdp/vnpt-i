import React, { PureComponent } from 'react'
import { autobind } from 'core-decorators'
import update from 'react-addons-update'
import swal from 'sweetalert2'
import $ from 'jquery'

function cleanPagination(pagination) {
  return {
    itemPerPage: parseInt(
      pagination.item_per_page
        ? pagination.item_per_page
        : pagination.itemPerPage,
      10
    ),
    page: parseInt(pagination.page, 10),
    totalItem: parseInt(
      pagination.total_item ? pagination.total_item : pagination.totalItem,
      10
    )
  }
}

const createManagerListHoc = ({
  apiCall,
  cleanData,
  apiDelete,
  keyData = 'data',
  itemPerPage = 10
}) => Component => {
  @autobind
  class ManagerListHoc extends PureComponent {
    state = {
      data: [],
      pagination: {
        page: 1
      },
      pageLogs: [],
      isLoading: false
    }

    async componentWillMount() {
      this.setState({ isLoading: true })
      const res = await apiCall({
        itemPerPage,
        page: 1
      })
      this.setState({
        data: cleanData ? cleanData(res[keyData]) : res[keyData],
        pagination: cleanPagination(res.pagination),
        isLoading: false,
        pageLogs: [...this.state.pageLogs, 1]
      })
    }

    async handleChangePage(page) {
      this.setState({
        isLoading: true
      })
      const res = await apiCall({
        itemPerPage: this.state.pagination.itemPerPage,
        page
      })
      this.setState({
        data: cleanData ? cleanData(res[keyData]) : res[keyData],
        pagination: cleanPagination(res.pagination),
        isLoading: false
      })
      $('html, body').animate(
        {
          scrollTop: 0
        },
        600
      )
    }

    getIndexByPagination(index) {
      const { page, itemPerPage } = this.state.pagination
      return (page - 1) * itemPerPage + index + 1
    }

    handleDeleteItem(e, itemName, logicFunc = () => {}, itemKeyDelete) {
      if (e) {
        e.preventDefault()
      }
      swal({
        title: `Bạn có muốn xóa "${itemName}"`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Vâng, hãy xóa',
        cancelButtonText: 'Bỏ qua'
      }).then(() => {
        const itemIndex = this.state.data.findIndex(logicFunc)
        if (itemIndex === -1) return
        apiDelete(itemKeyDelete)
          .then(() => {})
          .catch(e => {
            console.log(e)
          })
        this.setState({
          data: update(this.state.data, {
            $splice: [[itemIndex, 1]]
          })
        })
      })
    }

    handleRefresh() {
      this.handleChangePage(this.state.pagination.page)
    }

    render() {
      return (
        <Component
          {...this.props}
          data={this.state.data}
          pagination={this.state.pagination}
          isLoading={this.state.isLoading}
          onChangePage={this.handleChangePage}
          onDeleteItem={this.handleDeleteItem}
          onRefresh={this.handleRefresh}
          getIndexByPagination={this.getIndexByPagination}
        />
      )
    }
  }
  return ManagerListHoc
}

export default createManagerListHoc
