import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Clearfix from 'components/elements/clearfix'
import { colorLevels } from 'constants/warningLevels'
import TimeAgo from 'react-timeago'

const NotificationItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: ${props => props.color || colorLevels['GOOD']};
`
const SpanTimeAgo = SpanMeta.extend`
  color: #c6cbd4;
  with: 80px;
`

const MeasureWrapper = styled.div``

@autobind
export default class NotificationItem extends React.PureComponent {
  static propTypes = {
    receivedAt: PropTypes.string,
    warningLevel: PropTypes.string,
    measuringList: PropTypes.array,
    onClick: PropTypes.func,
    measuring: PropTypes.shape({
      name: PropTypes.string,
      contentLimit: PropTypes.string,
      warningLevel: PropTypes.string,
      unit: PropTypes.string,
      minLimit: PropTypes.number,
      maxLimit: PropTypes.number,
      value: PropTypes.number
    })
  }

  render() {
    const { stationName, measuringList, receivedAt } = this.props
    return (
      <NotificationItemWrapper onClick={this.props.onClick}>
        <CircleIcon color={getMaxWarningLevel(measuringList)} />
        <Clearfix width={8} />
        <InfoWrapper>
          <SpanStationTitle>{stationName}</SpanStationTitle>
          <MetaWrapper>
            <MeasureWrapper>
              {measuringList.map(
                (
                  {
                    name,
                    contentLimit,
                    warningLevel,
                    value,
                    unit,
                    minLimit,
                    maxLimit
                  },
                  index
                ) => (
                  <InfoWrapper key={index}>
                    {' '}
                    <SpanNumberMeta key={`${index}`}>
                      {name}:{' '}
                      <SpanColor color={colorLevels[warningLevel]}>
                        {value}
                      </SpanColor>{' '}
                      {''}
                      ({minLimit}
                      {' - '}
                      {maxLimit})
                    </SpanNumberMeta>
                  </InfoWrapper>
                )
              )}
            </MeasureWrapper>
          </MetaWrapper>
        </InfoWrapper>
        <SpanTimeAgo>
          <TimeAgo date={receivedAt} />
        </SpanTimeAgo>
      </NotificationItemWrapper>
    )
  }
}

function getMaxWarningLevel(measuringList) {
  let level = 0
  let newLevel = 0
  let warningLevel = null
  for (let element of measuringList) {
    // EXCEEDED = 3, EXCEEDED_PREPARING = 2, EXCEEDED_TENDENCY = 1
    if (element.warningLevel === 'EXCEEDED_TENDENCY') {
      newLevel = 1
    }

    if (element.warningLevel === 'EXCEEDED_PREPARING') {
      newLevel = 2
    }

    if (element.warningLevel === 'EXCEEDED') {
      newLevel = 3
    }

    if (level < newLevel) {
      warningLevel = element.warningLevel
    }
  }
  return colorLevels[warningLevel || 'GOOD']
}
