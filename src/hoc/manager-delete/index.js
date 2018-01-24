import React from 'react'
import { autobind } from 'core-decorators'
import { Modal, message } from 'antd'
/**
 * Manager list data
 * @param apiList
 * @param apiDelete
 */
const createManagerDelete = ({ apiDelete }) => Component => {
  @autobind
  class ManagerDeleteHoc extends React.Component {
    confirmDelete(apiDelete, key, callbackSuccess = () => {}) {
      Modal.confirm({
        title: 'Do you want to delete these items?',
        onOk() {
          return new Promise(async (resolve, reject) => {
            const res = await apiDelete(key)
            console.log(res)
            if (res.success) {
              message.info('Delete success!')
              callbackSuccess()
            } else message.error('Delete error!')
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    }
    /**
     * Xóa delete item
     * @param key
     * @returns {Promise.<void>}
     */
    async deleteItem(key, callback) {
      this.confirmDelete(apiDelete, key, () => {
        if (callback) callback()
      })
    }
    render() {
      // Truyền các tham số cho Component con (props)
      const props = {
        onDeleteItem: this.deleteItem
      }
      return <Component {...this.props} {...props} />
    }
  }
  return ManagerDeleteHoc
}

export default createManagerDelete
