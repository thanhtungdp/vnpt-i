import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Clearfix from 'components/elements/clearfix'

const NotificationItemWrapper = styled.div`
  display: flex;
  align-items: center;
`

const CircleIcon = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${props => props.color};
`

const InfoWrapper = styled.div`
  flex: 1;
`
const MetaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const SpanStationTitle = styled.span`
  font-size: 14px;
`
const SpanMeta = styled.span`
  font-size: 12px;
`
const SpanNumberMeta = SpanMeta.extend`
  color: #9b9b9b;
`
const SpanColor = SpanMeta.extend`
  color: ${props => props.color};
`
const SpanTimeAgo = SpanMeta.extend`
  color: #c6cbd4;
`

@autobind
export default class NotificationItem extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    measuring: PropTypes.shape({
      name: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
      value: PropTypes.number
    })
  }

  render() {
    const { name, min, max, value } = this.props.measuring
    return (
      <NotificationItemWrapper>
        <CircleIcon color={this.props.color} />
        <Clearfix width={8} />
        <InfoWrapper>
          <SpanStationTitle>{this.props.stationName}</SpanStationTitle>
          <MetaWrapper>
            <SpanNumberMeta>
              {name}: <SpanColor color={this.props.color}>{value}</SpanColor> ({
                min
              }{' '}
              - {max})
            </SpanNumberMeta>
            <SpanTimeAgo>2 minutes ago</SpanTimeAgo>
          </MetaWrapper>
        </InfoWrapper>
      </NotificationItemWrapper>
    )
  }
}
