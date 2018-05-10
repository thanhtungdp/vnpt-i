import React from 'react'
import { translate } from 'hoc/create-lang'
import { Select } from 'antd'

export default class SelectTimeRange extends React.PureComponent {
  render() {
    return (
      <Select {...this.props} showSearch>
        <Select.Option value={15}>
          15 {translate('avgSearchFrom.selectTimeRange.minute')}
        </Select.Option>
        <Select.Option value={30}>
          30 {translate('avgSearchFrom.selectTimeRange.minute')}
        </Select.Option>
        <Select.Option value={60}>
          {translate('avgSearchFrom.selectTimeRange.hour')}
        </Select.Option>
        <Select.Option value={24 * 60}>
          {translate('avgSearchFrom.selectTimeRange.day')}
        </Select.Option>
        <Select.Option value={'month'}>
          {translate('avgSearchFrom.selectTimeRange.month')}
        </Select.Option>
      </Select>
    )
  }
}
