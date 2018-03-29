import React from 'react'
import { colorLevels } from 'constants/warningLevels'
import styled from 'styled-components'

const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const WarningTitle = styled.span`
  font-weight: 600;
  font-size: 12px;
`
const WrapperColor = styled.div`
  display: flex;
  margin-top: 4px;
`
const ColorLevel = styled.span`
  width: 100px;
  height: 6px;
  background-color: ${props => props.color};
`
const WrapperText = styled.div`
  display: flex;
  margin-top: 4px;
`
const TextLevel = styled.span`
  width: 100px;
  font-size: 10px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.1px;
  text-align: left;
  color: #3b3b3b;
`

export default function LevelInfo() {
  return (
    <WarningWrapper>
      <WarningTitle>WARNING LEVELS</WarningTitle>
      <WrapperColor>
        <ColorLevel color={colorLevels.GOOD} />
        <ColorLevel color={colorLevels.EXCEEDED_TENDENCY} />
        <ColorLevel color={colorLevels.EXCEEDED_PREPARING} />
        <ColorLevel color={colorLevels.EXCEEDED} />
      </WrapperColor>
      <WrapperText>
        <TextLevel>Good</TextLevel>
        <TextLevel>Exceed tendency</TextLevel>
        <TextLevel>Exceed preparing</TextLevel>
        <TextLevel>Exceed</TextLevel>
      </WrapperText>
    </WarningWrapper>
  )
}
