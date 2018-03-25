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
      <Select showSearch {...this.props}>
        {this.state.stationTypes.map(stationType => (
          <Select.Option key={stationType.key} value={stationType.key}>
            {stationType.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}
