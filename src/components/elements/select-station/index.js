import React, { PureComponent } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import StationAutoApi from 'api/StationAuto'
import { autobind } from 'core-decorators'
import { translate } from 'hoc/create-lang'

@autobind
export default class SelectStation extends PureComponent {
  static propTypes = {
    query: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    isShowAll: PropTypes.bool
  }

  state = {
    stations: [],
    value: ''
  }

  async componentDidMount() {
    let query = {}
    const stations = await StationAutoApi.getStationAutos(
      { itemPerPage: 99999 },
      query
    )

    if (stations.success)
      this.setState({
        stations: stations.data,
        value: this.props.value
      })
  }

  onChange(value) {
    let res = this.state.stations.find(item => item.key === value)
    this.setState({
      value: value
    })
    if (this.props.onHandleChange) this.props.onHandleChange(res, this)
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    return (
      <Select
        showSearch
        {...this.props}
        onChange={this.onChange}
        value={this.state.value}
      >
        {this.props.isShowAll && (
          <Select.Option value={''}>
            {translate('dataSearchFrom.form.all')}
          </Select.Option>
        )}
        {this.state.stations.map(station => (
          <Select.Option key={station.key} value={station.key}>
            {station.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}
