import React from 'react'
import { Select } from 'antd'

export default class SelectTimeRange extends React.PureComponent {
  render() {
    return (
      <Select {...this.props} showSearch>
        <Select.Option value={15}>15 Minues</Select.Option>
        <Select.Option value={30}>30 Minues</Select.Option>
        <Select.Option value={60}>Hour</Select.Option>
        <Select.Option value={24 * 60}>Day</Select.Option>
        <Select.Option value={'month'}>Month</Select.Option>
      </Select>
    )
  }
}
