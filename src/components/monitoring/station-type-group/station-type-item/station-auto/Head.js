import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Clearfix from 'components/elements/clearfix'
import { SHAPE } from 'themes/color'
import { Icon, Tooltip } from 'antd'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

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
  width: 20px;
  height: 20px;
  border-radius: 5px;
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
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 0px;
`
const ReceivedAt = styled.span`
  color: ${SHAPE.GRAYTEXT};
`

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Divider = styled.div`
  width: 1px;
  height: 13px;
  margin-left: 4px;
  margin-right: 4px;
  background-color: ${SHAPE.GRAYBOLD};
`

@autobind
export default class StationAutoHead extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    receivedAt: PropTypes.string,
    orderNumber: PropTypes.number,
    stationID: PropTypes.string,
    options: PropTypes.object
  }
  componentWillMount() {}

  render() {
    //console.log(this.props)
    const {
      name,
      receivedAt,
      orderNumber,
      stationID,
      options,
      _id
    } = this.props
    const isCamera = options && options.camera && options.camera.allowed
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
          {protectRole(ROLE.MONITORING.CONTROL)(
            <Link
              to={slug.controlStation.triggerWithKey + `/${stationID}/${name}`}
            >
              <Tooltip title="Sampling">
                <Icon type="rocket" size={15} />
              </Tooltip>
            </Link>
          )}
          {protectRole(ROLE.MONITORING.CONTROL)(<Divider />)}

          {protectRole(ROLE.MONITORING.CAMERA)(
            <Link to={'/'} style={{ display: 'flex' }}>
              <Tooltip title="Camera">
                <img src="/images/camera.png" />
              </Tooltip>
            </Link>
          )}
        </ActionWrapper>
      </StationHeadItemWrapper>
    )
  }
}
