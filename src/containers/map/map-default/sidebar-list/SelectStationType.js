import React, { PureComponent } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import CategoryApi from 'api/CategoryApi'
import { autobind } from 'core-decorators'
import styled from 'styled-components'

const SelectWrapper = styled.div`
  width: 100%;
  .ant-select {
    width: 100%;
  }
  .ant-select-selection--single {
    height: 22px;
    width: 100%;
    background-color: #41aee4;
    border: 0px;
  }
  .ant-select-selection-selected-value {
    line-height: 2;
    font-size: 12px;
    color: #ffffff;
    padding-right: 15px;
  }
  .ant-select-arrow {
    color: #ffffff;
  }
`

@autobind
export default class SelectStationType extends PureComponent {
  static propTypes = {
    query: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    stationTypes: []
  }

  async componentDidMount() {
    let query = {}
    const stationTypes = await CategoryApi.getStationTypes({}, query)
    this.setState({ stationTypes: stationTypes.data })
  }

  render() {
    return (
      <SelectWrapper>
        <Select showSearch {...this.props}>
          <Select.Option value={''}>All</Select.Option>
          {this.state.stationTypes.map(stationType => (
            <Select.Option key={stationType.key} value={stationType.key}>
              {stationType.name}
            </Select.Option>
          ))}
        </Select>
      </SelectWrapper>
    )
  }
}
