import React from 'react'
import styled from 'styled-components'

const LogoWrapper = styled.div`
  padding: 8px;
  &:hover {
    background-color: rgba(9, 30, 66, 0.04);
  }
`

const LogoContainer = styled.img`
  height: 35px;
  width: auto;
`

export default function Logo() {
  return (
    <LogoWrapper>
      <LogoContainer src="/images/logo/logo-text-icon.png" />
    </LogoWrapper>
  )
}
