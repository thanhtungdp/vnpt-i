import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { colorLevels } from 'constants/warningLevels'
import { translate } from 'hoc/create-lang'

const MeasuringItemWrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  border: solid 1px #f1f1f1;
`
const MeasuringItemText = styled.div`
  display: flex;
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

const MeasuringUnit = styled.span`
  position: relative;
  top: -10px;
  font-size: 8px;
  color: ${props => props.color};
`

const MeasuringValue = styled.div`
  font-size: 16px;
  text-align: left;
  color: ${props => props.color};
  position: relative;
`

const MeasuringLimit = styled.span`
  font-size: 10px;
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

  getLimitText() {
    const { unit, minLimit, maxLimit } = this.props
    let limitText = ''
    if (minLimit || maxLimit) {
      if (minLimit)
        limitText = translate('monitoring.limit') + ': > ' + minLimit
      if (maxLimit) {
        if (limitText) limitText = limitText + ' & < ' + maxLimit
        else limitText = translate('monitoring.limit') + ': < ' + maxLimit
      }
    }
    return limitText ? `${limitText} ${unit}` : <span>&nbsp;</span>
  }

  getColorLevel() {
    const { warningLevel } = this.props
    if (warningLevel && colorLevels[warningLevel])
      return colorLevels[warningLevel]
    return colorLevels.GOOD
  }

  render() {
    const { value, unit, name } = this.props
    return (
      <MeasuringItemWrapper>
        <MeasuringItemText>
          <MeasuringValue color={this.getColorLevel()}>
            {value}{' '}
            {unit ? (
              <MeasuringUnit color={this.getColorLevel()} className="unit">
                {unit}
              </MeasuringUnit>
            ) : (
              ''
            )}
          </MeasuringValue>

          <MeasuringName color={this.getColorLevel()}>{name}</MeasuringName>
        </MeasuringItemText>
        <MeasuringLimit>{this.getLimitText()}</MeasuringLimit>
      </MeasuringItemWrapper>
    )
  }
}
