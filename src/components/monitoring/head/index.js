import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { Input } from 'antd'
import Clearfix from 'components/elements/clearfix'
import { colorLevels } from 'constants/warningLevels'

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TitleWrapper = styled.div`
  display: flex;
`
const Title = styled.h1`
  font-size: 22px;
  margin-top: 0px;
  line-height: 1.6em;
  margin-bottom: 0px;
`
const InputText = styled(Input)`
  width: 230px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 1px #eeeeee;
`
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

@autobind
export default class Header extends React.PureComponent {
  static propTypes = {
    number: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    color: PropTypes.string
  }

  render() {
    return (
      <HeaderWrapper>
        <TitleWrapper>
          <Title>Monitoring</Title>
          <Clearfix width={24} />
          <InputText />
        </TitleWrapper>
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
      </HeaderWrapper>
    )
  }
}
