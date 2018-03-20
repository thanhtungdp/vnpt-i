import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { Input } from 'antd'
import { colorLevels } from 'constants/warningLevels'

const HeadItemWrapper = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TitleWrapper = styled.div`
  display: flex;
`
const Title = styled.div`
  width: 116px;
  height: 30px;
  font-family: OpenSans;
  font-size: 22px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.3px;
  text-align: left;
  color: #3b3b3b;
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
const WarningTitle = styled.div`
  text-align: center;
  background-color: #fafbfb;
  box-shadow: 0 0.5px 0 0 rgba(199, 199, 199, 0.5);
`
const WrapperColor = styled.div`
  display: flex;
`
const ColorLevel = styled.span`
  width: 100px;
  height: 6px;
  background-color: ${props => props.color};
`
const WrapperText = styled.div`
  display: flex;
`
const TextLevel = styled.span`
  width: 100px;
  height: 13px;
  font-size: 9px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.1px;
  text-align: left;
  color: #3b3b3b;
`

@autobind
export default class HeadItem extends React.PureComponent {
  static propTypes = {
    number: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    color: PropTypes.string
  }

  render() {
    return (
      <HeadItemWrapper>
        <TitleWrapper>
          <Title>Monitoring</Title>
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
      </HeadItemWrapper>
    )
  }
}
