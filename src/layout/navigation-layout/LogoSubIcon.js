import React from 'react'
import styled from 'styled-components'

const LogoContainer = styled.img`
  height: 35px;
  width: auto;
`

export default function LogoSubIcon(props) {
  return <LogoContainer src="/images/logo/logo-icon.png" />
}
