import React from 'react'
import styled from 'styled-components'

import Input from '../input'
import Label from '../label'

const View = styled.div``

export default function InputLabel({ label, ...props }) {
  return (
    <View>
      {label && <Label>{label}</Label>}
      <Input
        {...props}
        value={props.value ? props.value : props.initialValue}
      />
    </View>
  )
}

InputLabel.propTypes = {
  ...Input.propTypes
}
