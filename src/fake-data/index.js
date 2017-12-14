import React, { PureComponent } from 'react'
import { autobind } from 'core-decorators'

const createManagerListHoc = ({ apiCall, itemPerPage = 10 }) => Component => {
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
        isLoading: false
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

    render() {
      return (
        <Component
          {...this.props}
          data={this.state.data}
          pagination={this.state.pagination}
          isLoading={this.state.isLoading}
          onChangePage={this.handleChangePage}
          getIndexByPagination={this.getIndexByPagination}
        />
      )
    }
  }
  return ManagerListHoc
}

export default createManagerListHoc
