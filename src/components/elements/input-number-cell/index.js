import React from 'react'
import { InputNumber } from 'antd'
import PropTypes from 'prop-types'

export default class InputNumberCell extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.number
  }
  state = {
    value: this.props.value
  }

  onChange(value) {
    console.log(value)
    this.props.onChange(value)
    this.setState({ value: value })
  }

  render() {
    return (
      <div>
        {this.props.editable ? (
          <InputNumber
            style={{ margin: '-5px 0' }}
            value={this.props.value}
            onChange={e => this.props.onChange(e)}
          />
        ) : (
          this.props.value
        )}
      </div>
    )
  }
}
