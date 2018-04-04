import React from 'react'
import { autobind } from 'core-decorators'

/**
 * Manager list data
 * @param apiList
 * @param apiDelete
 */
const createManagerList = ({ apiList, itemPerPage = 20 }) => Component => {
  @autobind
  class ManagerListHoc extends React.Component {
    state = {
      dataSource: [],
      isLoading: false,
      pagination: {
        itemPerPage: itemPerPage,
        page: 1
      },
      pathImg: '',
      data: {}
    }

    /**
     * Cập nhật dữ liệu dựa trên tham số dataSource
     * @returns {Promise.<void>}
     */
    async fetchData() {
      this.setState({
        isLoading: true
      })
      const res = await apiList(this.state.pagination, this.state.data)

      this.setState({
        dataSource: res.data,
        pagination: res.pagination,
        isLoading: false,
        pathImg: res.path
      })
    }

    // Su kien truoc khi component duoc tao ra
    async componentWillMount() {
      this.fetchData()
    }

    /**
     * Thay đổi trang nội dung
     * @param page
     * @param pageSize
     */
    onChangePage(page, pageSize) {
      this.setState(
        {
          pagination: {
            ...this.state.pagination,
            page: page,
            itemPerPage: pageSize
          }
        },
        () => {
          this.fetchData()
        }
      )
    }

    onChangeSearch(pagination, dataSearch) {
      this.setState(
        {
          pagination: {
            ...this.state.pagination,
            pagination
          },
          data: { ...dataSearch }
        },
        () => {
          this.fetchData()
        }
      )
    }

    /**
     * Thay đổi page size
     * @param currentPage
     * @param pageSize
     */
    onChangePageSize(currentPage, pageSize) {
      this.setState(
        {
          pagination: {
            page: 1,
            itemPerPage: pageSize
          }
        },
        () => {
          console.log(this.state.pagination)
          this.fetchData()
        }
      )
    }

    render() {
      // Truyền các tham số cho Component con (props)
      const props = {
        dataSource: this.state.dataSource,
        pagination: this.state.pagination,
        isLoading: this.state.isLoading,
        onChangePage: this.onChangePage,
        onChangePageSize: this.onChangePageSize,
        fetchData: this.fetchData,
        pathImg: this.state.pathImg,
        onChangeSearch: this.onChangeSearch,
        data: this.state.data
      }
      return <Component {...this.props} {...props} />
    }
  }

  return ManagerListHoc
}

export default createManagerList
