import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { colorLevels } from 'constants/warningLevels'
const MeasuringItemWrapper = styled.div`
  display: flex;
  padding: 16px 25px;
  flex-direction: column;
  justify-content: space-between;
  width: 208.3px;
  height: 77px;
  border-radius: 8px;
  border: solid 1px #f1f1f1;
`
const MeasuringItemText = styled.div`
  display: flex;
  height: 22px;
  justify-content: space-between;
`

const MeasuringName = styled.span`
  padding: 0 5px 0 5px;
  display: flex;
  font-size: 12px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${props => props.color};
`
const MeasuringValue = styled.span`
  font-family: OpenSans;
  font-size: 16px;
  letter-spacing: -0.2px;
  text-align: left;
  color: ${props => props.color};
`
const MeasuringLimit = styled.span`
  font-family: OpenSans;
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  text-align: left;
  color: #b9b9b9;
`
@autobind
export default class MeasuringItem extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number,
    unit: PropTypes.string,
    name: PropTypes.string,
    minLimit: PropTypes.number,
    maxLimit: PropTypes.number,
    warningLevel: PropTypes.string
  }

  render() {
    const { value, unit, name, minLimit, maxLimit, warningLevel } = this.props
    let colorLevel = colorLevels.GOOD
    if (warningLevel && colorLevels[warningLevel])
      colorLevel = colorLevels[warningLevel]
    let limitText = ''
    if (minLimit || maxLimit) {
      if (minLimit) limitText = 'Limit: > ' + minLimit
      if (maxLimit) {
        if (limitText) limitText = limitText + ' & < ' + maxLimit
        else limitText = 'Limit: < ' + maxLimit
      }
    }
    if (limitText) limitText = limitText + ' ' + unit
    return (
      <MeasuringItemWrapper>
        <MeasuringItemText>
          <MeasuringValue color={colorLevel}>
            {value} {unit ? unit : ''}
          </MeasuringValue>
          <MeasuringName color={colorLevel}>{name}</MeasuringName>
        </MeasuringItemText>
        <MeasuringLimit>{limitText}</MeasuringLimit>
      </MeasuringItemWrapper>
    )
  }
}
