import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { autobind } from 'core-decorators'
import ReactTelephoneInput from 'react-telephone-input/lib/ReactTelephoneInput'

const View = styled.div`
  .react-tel-input input[type='tel'] {
    height: initial;
    line-height: 22px;
    box-shadow: none;
    border: 1px solid #d4d4d4;
  }
  .react-tel-input .selected-flag {
    height: 100%;
  }
`

@autobind
export default class InputPhoneNumber extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any
  }

  handleTelChange(telNumber, selectedCountry) {
    const dataSource = {
      phoneNumber: telNumber,
      ...selectedCountry
    }
    this.props.onChange(dataSource)
  }

  getRealValue() {
    if (typeof this.props.value === 'object') {
      return this.props.value.phoneNumber
    }
    return ''
  }

  render() {
    return (
      <View>
        <ReactTelephoneInput
          {...this.props}
          defaultCountry={'vn'}
          flagsImagePath="/images/flags.png"
          value={this.getRealValue()}
          onChange={this.handleTelChange}
          onBlur={() => {}}
        />
      </View>
    )
  }
}
