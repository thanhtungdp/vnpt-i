import React, { PureComponent } from 'react'
import { Select, Form } from 'antd'
import PropTypes from 'prop-types'
import CategoryApi from 'api/CategoryApi'
import { autobind } from 'core-decorators'

const FormItem = Form.Item

@autobind
export default class SelectStationType extends PureComponent {
  static propTypes = {
    query: PropTypes.object,
    getFieldDecorator: PropTypes.func,
    label: PropTypes.string,
    onChangeStationType: PropTypes.func
  }

  state = {
    selectItems: [],
    stationTypes: [],
    value: ''
  }

  async componentDidMount() {
    let query = {}
    const stationTypes = await CategoryApi.getStationTypes({}, query)
    const options =
      stationTypes.data !== undefined ? (
        stationTypes.data.map(d => (
          <Select.Option key={d.key} value={d.key}>
            {d.name.vi}
          </Select.Option>
        ))
      ) : (
        <Select.Option />
      )
    this.setState({ stationTypes: stationTypes.data, selectItems: options })
  }

  changeStationType(value) {
    if (typeof value === 'string' && this.state.selectItems.length > 0) {
      var stationType = this.state.stationTypes.find(i => i.key === value)
      if (this.props.onChangeStationType)
        this.props.onChangeStationType(stationType)
    }
    this.setState({ value })
    return value
  }

  render() {
    return (
      <FormItem label={this.props.label}>
        {this.props.getFieldDecorator('stationType', {
          initialValue: this.props.value
        })(
          <Select
            showSearch
            onChange={this.changeStationType}
            value={this.state.value}
          >
            {this.state.selectItems}
          </Select>
        )}
      </FormItem>
    )
  }
}
