import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Checkbox from '@atlaskit/checkbox'

const CheckboxItemImage = styled.img`
  height: 15px;
`

@autobind
export default class CheckBoxCustom extends React.PureComponent {
  static propTypes = {
    image: PropTypes.string,
    label: PropTypes.string
  }

  render() {
    return (
      <div>
        <Checkbox
          {...this.props}
          label={
            <span>
              <CheckboxItemImage src={this.props.image} />
              {this.props.label}
            </span>
          }
        />
      </div>
    )
  }
}
