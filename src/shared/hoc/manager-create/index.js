import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import swal from 'sweetalert2'

export const createPropTypes = {
  onCreate: PropTypes.func
}

export default ({ apiCreate, redirectPath = '/' }) => Component => {
  @autobind
  class HocManagerCreate extends React.Component {
    async handleCreate(values) {
      const gallerySlider = await apiCreate(values)
      if (gallerySlider.error === true) {
        swal({
          type: 'error',
          title: 'error',
          text: gallerySlider.message
        })
        return
      }
      swal({
        type: 'success',
        title: 'Tạo thành công'
      })
      this.props.history.push(redirectPath)
    }

    render() {
      return (
        <div>
          <Component {...this.props} onCreate={this.handleCreate} />
        </div>
      )
    }
  }
  return HocManagerCreate
}
