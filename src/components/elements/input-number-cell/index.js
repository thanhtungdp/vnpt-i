import React from 'react'
import { InputNumber } from 'antd'
import PropTypes from 'prop-types'

export default class InputNumberCell extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.number,
    defaultValue: PropTypes.object
  }

  render() {
    return (
      <div>
        {this.props.editable ? (
          <InputNumber
            style={{ margin: '-5px 0', width: '100%' }}
            value={this.props.value}
            disabled={this.props.disabled}
            onChange={this.props.onChange}
          />
        ) : (
          this.props.value
        )}
      </div>
    )
  }
}
