import React from 'react'
import styled from 'styled-components'
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles'
import Label from '../label'

require('../input-phone-number/index.css')
const View = styled.div``

export default function InputPhoneNumber({ label, ...props }) {
  return (
    <View>
      {label && <Label>{label}</Label>}
      <ReactTelephoneInput
        {...props}
        flagsImagePath="/images/flags.png"
        value={props.value ? props.value : props.initialValue}
      />
    </View>
  )
}

InputPhoneNumber.propTypes = {
  ...InputPhoneNumber.propTypes
}
