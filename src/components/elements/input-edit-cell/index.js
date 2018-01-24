import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

export default class InputEditCell extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func
  }

  render() {
    return (
      <div>
        {this.props.editable ? (
          <Input
            style={{ margin: '-5px 0' }}
            value={this.props.value}
            onChange={e => this.props.onChange(e.target.value)}
          />
        ) : (
          this.props.value
        )}
      </div>
    )
  }
}
