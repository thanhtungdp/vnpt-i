import React from 'react'
import styled from 'styled-components'

import Input from '../input'
import Label from '../label'

const View = styled.div``

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
