import React from 'react'
import { Input as InputBootstrap } from 'reactstrap'
import styled from 'styled-components'

import style from './style'

const InputRestyle = styled(InputBootstrap)`
  ${style};
  ${props =>
    props.size === 'lg'
      ? `
    padding: 16px 16px;
    font-size: 18px;
  `
      : ''};
`

export default function Input(props) {
  return <InputRestyle {...props} />
}

Input.propTypes = {
  ...InputBootstrap.propTypes
}
