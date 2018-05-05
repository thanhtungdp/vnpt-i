import React from 'react'
import { autobind } from 'core-decorators'
import { isJsonString } from 'utils/string'
import { getParameterByName } from 'utils'

const createQueryFormDataBrowser = (queryParams = []) => Component => {
  // @withRouter
  @autobind
  class QueryFormDataBrowser extends React.Component {
    getFormData() {
      const formDataStr = getParameterByName('formData')
      if (formDataStr)
        return isJsonString(formDataStr) ? JSON.parse(formDataStr) : {}
      return {}
    }

    getQuery() {
      let query = {}
      queryParams.forEach(key => {
        query[key] = getParameterByName(key)
      })
      return query
    }

    render() {
      return <Component formData={this.getFormData()} query={this.getQuery()} />
    }
  }
  return QueryFormDataBrowser
}

export default createQueryFormDataBrowser
