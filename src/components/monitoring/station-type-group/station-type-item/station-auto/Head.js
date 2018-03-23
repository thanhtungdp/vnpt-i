import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Clearfix from 'components/elements/clearfix'
import { SHAPE } from 'themes/color'

const StationHeadItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
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
  background: linear-gradient(
    135deg,
    rgb(29, 137, 206) 0%,
    rgb(86, 210, 243) 100%
  );
  font-weight: 700;
  color: #ffffff;
`
const StationName = styled.h4`
  font-weight: 600;
  font-size: 18px;
  margin-top: 0px;
  margin-bottom: 0px;
`
const ReceivedAt = styled.span`
  color: ${SHAPE.GRAYTEXT};
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
          <Clearfix width={8} />
          <StationName>{name}</StationName>
          <Clearfix width={8} />
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
