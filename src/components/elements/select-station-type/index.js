import React, { PureComponent } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import CategoryApi from 'api/CategoryApi'
import { autobind } from 'core-decorators'

@autobind
export default class SelectStationType extends PureComponent {
  static propTypes = {
    query: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.value
  }

  state = {
    stationTypes: [],
    value: ''
  }

  async componentDidMount() {
    let query = {}
    const stationTypes = await CategoryApi.getStationTypes({}, query)
    this.setState({
      stationTypes: stationTypes.data,
      value: this.props.value
    })
  }

  onChange(value) {
    let res = this.state.stationTypes.find(item => item.key === value)
    this.setState({
      value: value
    })
    if (this.props.onHandleChange) this.props.onHandleChange(res, this)
  }

  render() {
    return (
      <Select
        showSearch
        {...this.props}
        onChange={this.onChange}
        value={this.state.value}
      >
        {this.state.stationTypes.map(stationType => (
          <Select.Option key={stationType.key} value={stationType.key}>
            {stationType.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}
