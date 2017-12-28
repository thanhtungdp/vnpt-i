import React, { PureComponent } from 'react'
import { autobind } from 'core-decorators'
import update from 'react-addons-update'
import swal from 'sweetalert2'

const createManagerListHoc = ({
  apiCall,
  apiDelete,
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
        data: res.data,
        pagination: res.pagination,
        isLoading: false,
        pageLogs: [...this.state.pageLogs, 1]
      })
    }

    async handleChangePage(page) {
      if (this.state.pageLogs.indexOf(page) > -1) {
        return
      }
      this.setState({
        isLoading: true,
        pageLogs: [...this.state.pageLogs, page]
      })
      const res = await apiCall({
        itemPerPage: this.state.pagination.itemPerPage,
        page
      })
      this.setState({
        data: [...this.state.data, ...res.data],
        pagination: res.pagination,
        isLoading: false
      })
    }

    getIndexByPagination(index) {
      const { page, itemPerPage } = this.state.pagination
      console.log((page - 1) * itemPerPage + index + 1)
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

    render() {
      return (
        <Component
          {...this.props}
          data={this.state.data}
          pagination={this.state.pagination}
          isLoading={this.state.isLoading}
          onChangePage={this.handleChangePage}
          onDeleteItem={this.handleDeleteItem}
          getIndexByPagination={this.getIndexByPagination}
        />
      )
    }
  }
  return ManagerListHoc
}

export default createManagerListHoc
