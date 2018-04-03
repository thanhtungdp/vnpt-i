import React from 'react'
import { message } from 'antd'
import { autobind } from 'core-decorators'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
const createManagerEdit = ({ apiUpdate, apiGetByKey }) => Component => {
  @createLanguage
  @autobind
  class ManagerEditHoc extends React.Component {
    state = {
      isLoaded: false,
      data: {}
    }
    static propTypes = {
      lang: langPropTypes
    }
    async updateItem(data) {
      const key = this.props.match.params.key
      const res = await apiUpdate(key, data)
      if (res.success)
        message.info(this.props.lang.t('addon.onSave.update.success'))
      else message.error(this.props.lang.t('addon.onSave.update.error'))
    }

    //Su kien truoc khi component duoc tao ra
    async getItem() {
      const key = this.props.match.params.key
      const item = await apiGetByKey(key)
      if (item.success) this.setState({ isLoaded: true, data: item.data })
      else this.setState({ isLoaded: true, data: {}, message: item.message })
    }

    render() {
      const props = {
        isLoaded: this.state.isLoaded,
        data: this.state.data,
        onUpdateItem: this.updateItem,
        getItem: this.getItem
      }
      return <Component {...this.props} {...props} />
    }
  }
  return ManagerEditHoc
}
export default createManagerEdit
