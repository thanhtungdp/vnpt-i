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
// import stationStatus from 'constants/stationStatus'
import protectRole from 'hoc/protect-role'
import { translate } from 'hoc/create-lang'

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

const WrapperNameStationTypeName = styled.div`
  flex-direction: column;
  .stationName {
    font-size: 12px;
  }
  .stationTypeName {
    font-size: 10px;
    display: block;
    color: ${SHAPE.PRIMARY};
    opacity: 0.7;
  }
`

const ReceivedAt = styled.span`
  color: ${props => (props.status !== 'GOOD' ? SHAPE.PRIMARY : '#000')};
`

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: -8px;
  margin-right: -8px;
  .actionItem {
    padding: 0px 8px;
    color: #1890ff;
    border-right: 1px solid ${SHAPE.GRAYBOLD};
    &:hover {
      cursor: pointer;
    }
  }
  .actionItem:last-child {
    border-right: 0px;
  }
`

@autobind
export default class StationAutoHead extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    stationTypeName: PropTypes.string,
    receivedAt: PropTypes.string,
    orderNumber: PropTypes.number,
    stationID: PropTypes.string,
    options: PropTypes.object,
    status: PropTypes.string,
    onClickDataSearch: PropTypes.func,
    onClickViewMap: PropTypes.func
  }
  componentWillMount() {}

  render() {
    //console.log(this.props)
    const {
      name,
      stationTypeName,
      receivedAt,
      orderNumber,
      stationID,
      options,
      status,
      _id
    } = this.props
    const isCamera = options && options.camera && options.camera.allowed
    const isSampling = options && options.camera && options.sampling.allowed
    return (
      <StationHeadItemWrapper>
        <TitleWrapper>
          <OrderNumber>{orderNumber}</OrderNumber>
          <Clearfix width={8} />
          {stationTypeName ? (
            <WrapperNameStationTypeName>
              <StationName className="stationName">{name}</StationName>
              <span className="stationTypeName">{stationTypeName}</span>
            </WrapperNameStationTypeName>
          ) : (
            <StationName>{name}</StationName>
          )}
          <Clearfix width={8} />
          <ReceivedAt status={status}>
            {receivedAt ? ' | ' + receivedAt : ''}
          </ReceivedAt>
        </TitleWrapper>
        <ActionWrapper>
          {isSampling &&
            protectRole(ROLE.MONITORING.CONTROL)(
              <Link
                className="actionItem"
                to={
                  slug.controlStation.triggerWithKey + `/${stationID}/${name}`
                }
              >
                <Tooltip title={translate('monitoring.samPling')}>
                  <Icon type="weibo" style={{ fontSize: 16 }} />
                </Tooltip>
              </Link>
            )}
          {isCamera &&
            protectRole(ROLE.MONITORING.CAMERA)(
              <Link
                className="actionItem"
                to={slug.monitoring.viewCameraWithKey + '/' + _id}
                style={{ display: 'flex' }}
              >
                <Tooltip title={translate('monitoring.camera')}>
                  <Icon type="camera" style={{ fontSize: 16 }} />
                </Tooltip>
              </Link>
            )}
          <div onClick={this.props.onClickViewMap} className="actionItem">
            <Tooltip title={translate('monitoring.viewInMap')}>
              <i className="fa fa-map-marker" />
            </Tooltip>
          </div>
          <div onClick={this.props.onClickDataSearch} className="actionItem">
            <Tooltip title={translate('monitoring.dataSearch')}>
              <Icon type="area-chart" />
            </Tooltip>
          </div>
        </ActionWrapper>
      </StationHeadItemWrapper>
    )
  }
}
