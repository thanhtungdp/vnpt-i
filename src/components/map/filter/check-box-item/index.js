import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import CheckboxStateless from '@atlaskit/checkbox'

const CheckboxItemImage = styled.img`
  height: 15px;
`

@autobind
export default class CheckBoxItemCustom extends React.PureComponent {
  static propTypes = {
    image: PropTypes.string,
    label: PropTypes.string
  }

  render() {
    return (
      <div>
        <CheckboxStateless
          initiallyChecked={this.props.value}
          {...this.props}
          label={
            <span>
              {this.props.image && <CheckboxItemImage src={this.props.image} />}
              {this.props.label}
            </span>
          }
        />
      </div>
    )
  }
}
