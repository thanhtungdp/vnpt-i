import React from 'react'
import CategoryApi from 'api/CategoryApi'
import SingleSelect from '../single-select'

export default class SelectCategory extends React.Component {
  state = {
    dataItems: []
  }

  async componentDidMount() {
    const res = await CategoryApi.getCategories({
      itemPerPage: 1000,
      page: 1
    })
    const items = res.data.map(record => ({
      content: `[${record.code}] ${record.name}`,
      value: record._id
    }))
    this.setState({
      dataItems: [
        {
          heading: 'Chuyên mục',
          items: items
        }
      ]
    })
  }

  render() {
    if (this.state.dataItems.length > 0)
      return (
        <SingleSelect
          shouldFitContainer
          dataItems={this.state.dataItems}
          {...this.props}
        />
      )
    return null
  }
}
