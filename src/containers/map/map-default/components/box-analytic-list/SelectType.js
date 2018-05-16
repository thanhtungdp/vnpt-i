import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { Select } from 'antd'
import { translate } from 'hoc/create-lang'

const SelectTypeWrapper = styled.div`
  width: 100%;
  .ant-select {
    width: 100%;
  }
  .ant-select-selection--single {
    width: 100%;
    background-color: #41aee4;
    border: 0px;
  }
  .ant-select-selection-selected-value {
    color: #ffffff;
    padding-right: 15px;
  }
  .ant-select-arrow {
    color: #ffffff;
  }
`

export const TYPE = {
  DATA_STATUS: 'dataStatus',
  STATION_STATUS: 'stationStatus'
}

@autobind
export default class SelectType extends React.PureComponent {
  getOptions() {
    return [
      {
        value: TYPE.DATA_STATUS,
        name: translate('map.menuRight.dataStatus')
      },
      {
        value: TYPE.STATION_STATUS,
        name: translate('map.menuRight.stationStatus')
      }
    ]
  }

  render() {
    return (
      <SelectTypeWrapper>
        <Select {...this.props}>
          {this.getOptions().map(item => (
            <Select.Option key={item.value} value={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </SelectTypeWrapper>
    )
  }
}
