import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { Select } from 'antd'
import StationAutoApi from 'api/StationAuto'

@autobind
export default class SelectStationAuto extends React.PureComponent {
  static propTypes = {
    stationTypeKey: PropTypes.string,
    onChangeObject: PropTypes.func
  }

  state = {
    stationAutoSelects: []
  }

  async componentWillMount() {
    const responseStationAuto = await StationAutoApi.getStationAutos({
      page: 1,
      itemPerPage: 10000000
    })
    this.setState({
      stationAutoSelects: responseStationAuto.data
    })
  }

  getStationAutos() {
    return this.state.stationAutoSelects.filter(
      stationAuto =>
        this.props.stationTypeKey && this.props.stationTypeKey !== ''
          ? stationAuto.stationType.key === this.props.stationTypeKey
          : false
    )
  }

  handleChange(stationTypeValue) {
    const stationType = this.state.stationAutoSelects.find(
      s => s.key === stationTypeValue
    )
    this.props.onChange(stationTypeValue)
    if (this.props.onChangeObject) {
      this.props.onChangeObject(stationType)
    }
  }

  render() {
    return (
      <Select
        {...this.props}
        onChange={this.handleChange}
        showSearch
        value={this.props.setKey ? this.props.stationAutoKey : this.props.value}
      >
        {this.getStationAutos().map(item => (
          <Select.Option key={item.key} value={item.key}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}
