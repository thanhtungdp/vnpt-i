import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'

const StationHeadItemWrapper = styled.div`
  height: 29px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TitleWrapper = styled.div`
  display: flex;
`
const OrderNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 29px;
  border-radius: 7px;
  text-align: center;
  vertical-align: middle;
  background-color: #f6f6f6;
`
const StationName = styled.div`
  display: flex;
  padding: 0 5px 0 15px;
  align-items: center;
  justify-content: center;
  font-family: OpenSans;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  text-align: left;
  color: #3b3b3b;
`
const ReceivedAt = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: OpenSans;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  text-align: left;
  color: #3b3b3b;
`

const ActionWrapper = styled.div`
  display: flex;
`
const CameraAction = styled.div``

@autobind
export default class StationAutoHead extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    receivedAt: PropTypes.string,
    orderNumber: PropTypes.number
  }

  render() {
    const { name, receivedAt, orderNumber } = this.props
    return (
      <StationHeadItemWrapper>
        <TitleWrapper>
          <OrderNumber>{orderNumber}</OrderNumber>
          <StationName>{name}</StationName>
          <ReceivedAt>{receivedAt ? ' - ' + receivedAt : ''}</ReceivedAt>
        </TitleWrapper>
        <ActionWrapper>
          <CameraAction>Control</CameraAction>
          <CameraAction>Camera</CameraAction>
        </ActionWrapper>
      </StationHeadItemWrapper>
    )
  }
}
