import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'

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
  background-color: #1dce6c;
`
const MeasuringValue = styled.span`
  font-family: OpenSans;
  font-size: 16px;
  letter-spacing: -0.2px;
  text-align: left;
  color: #1dce6c;
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
    maxLimit: PropTypes.number
  }

  render() {
    const { value, unit, name, minLimit, maxLimit } = this.props
    return (
      <MeasuringItemWrapper>
        <MeasuringItemText>
          <MeasuringValue>
            {value} {unit ? unit : ''}
          </MeasuringValue>
          <MeasuringName>{name}</MeasuringName>
        </MeasuringItemText>
        <MeasuringLimit>
          {/*{minLimit || maxLimit*/}
          {/*? 'Limit: ' + { minLimit } + ' - ' + { maxLimit }*/}
          {/*: ''}*/}
        </MeasuringLimit>
      </MeasuringItemWrapper>
    )
  }
}
