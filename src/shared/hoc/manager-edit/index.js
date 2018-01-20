import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import swal from 'sweetalert2'

export const managerPropTypes = {
  isLoaded: PropTypes.bool,
  formData: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

export default ({
  apiGet,
  apiUpdate,
  apiDelete,
  paramKey = '_id',
  redirectPath = '/'
}) => Component => {
  @autobind
  class HocManagerEdit extends React.Component {
    state = {
      formData: {},
      isLoaded: false
    }

    async componentWillMount() {
      const keyFetch = this.props.match.params[paramKey]
      const formData = await apiGet(keyFetch)
      this.setState({
        isLoaded: true,
        formData
      })
    }

    async handleUpdate(values) {
      const keyFetch = this.props.match.params[paramKey]
      const formData = await apiUpdate(keyFetch, values)
      swal({
        type: 'success',
        title: 'Cập nhật thành công'
      })
      this.setState({
        formData
      })
    }

    async handleDelete(itemName) {
      const keyFetch = this.props.match.params[paramKey]
      const context = this
      swal({
        title: `Bạn có muốn xóa "${itemName}"`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Vâng, hãy xóa',
        cancelButtonText: 'Bỏ qua'
      }).then(() => {
        apiDelete(keyFetch).then(() => {
          context.props.history.push(redirectPath)
        })
      })
    }

    render() {
      return (
        <div>
          <Component
            {...this.props}
            isLoaded={this.state.isLoaded}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            formData={this.state.formData}
          />
        </div>
      )
    }
  }
  return HocManagerEdit
}
