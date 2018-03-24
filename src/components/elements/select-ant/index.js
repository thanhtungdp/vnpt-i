import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

export default class SelectAnt extends React.PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        name: PropTypes.string
      })
    )
  }

  static defaultProps = {
    options: []
  }

  getRealValue() {
    if (!Array.isArray(this.props.value)) return []
    return this.props.value
  }

  render() {
    const { options, ...otherProps } = this.props
    return (
      <Select {...otherProps} value={this.getRealValue()}>
        {options.length > 0 &&
          options.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.name}
            </Select.Option>
          ))}
      </Select>
    )
  }
}
