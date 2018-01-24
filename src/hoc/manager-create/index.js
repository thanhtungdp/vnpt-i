import React from 'react'
import { autobind } from 'core-decorators'
import createLanguage, { langPropTypes } from 'hoc/create-lang'

const createManagerCreate = ({ apiCreate }) => Component => {
  @createLanguage
  @autobind
  class ManagerCreateHoc extends React.Component {
    static propTypes = {
      lang: langPropTypes
    }
    async createItem(data, callback) {
      const res = await apiCreate(data)
      if (callback) callback(res)
    }
    render() {
      const props = {
        onCreateItem: this.createItem
      }
      return <Component {...this.props} {...props} />
    }
  }
  return ManagerCreateHoc
}
export default createManagerCreate
