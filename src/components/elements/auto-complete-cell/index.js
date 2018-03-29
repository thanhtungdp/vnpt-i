import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

export default class AutoCompleteCell extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onchange: PropTypes.func,
    options: PropTypes.array,
    editable: PropTypes.bool,
    autoFocus: PropTypes.bool
  }

  render() {
    return (
      <div>
        {this.props.editable ? (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={this.props.placeholder}
            optionFilterProp="children"
            onChange={e => this.props.onChange(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            //value={this.props.value}
            autoFocus={this.props.autoFocus}
            {...this.props}
          >
            {this.props.options}
          </Select>
        ) : (
          this.props.value
        )}
      </div>
    )
  }
}
