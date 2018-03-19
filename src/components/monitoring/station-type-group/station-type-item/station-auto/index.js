import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import StationAutoHead from './Head'
import MeasuringList from './measuring/measuring-list'
import PropTypes from 'prop-types'
const StationAutoWrapper = styled.div`
  padding: 16px 15px 16px 15px;
  margin-bottom: 16px;
  height: 151px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(241, 241, 241, 0.5);
`

@autobind
export default class StationAutoItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    measuringList: PropTypes.array
  }
  render() {
    return (
      <StationAutoWrapper>
        <StationAutoHead />
        <MeasuringList />
      </StationAutoWrapper>
    )
  }
}
