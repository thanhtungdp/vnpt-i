import React from 'react'
import styled from 'styled-components'

import Input from '../input'

const View = styled.div``

const Label = styled.label`
  color: rgba(0, 0, 0, .5);
  font-weight: 600;
  font-size: 13px;
`

export default function InputLabel ({ label, ...props }) {
  return (
    <View>
      <Label>
        {label}
      </Label>
      <Input {...props} />
    </View>
  )
}

InputLabel.propTypes = {
  ...Input.propTypes
}
