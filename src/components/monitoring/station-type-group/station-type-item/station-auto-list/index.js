import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StationAuto from '../station-auto'

@autobind
export default class StationAutoList extends React.PureComponent {
  static propTypes = {
    stationAutoList: PropTypes.array
  }
  render() {
    return (
      <div>
        <StationAuto />
        <StationAuto />
        <StationAuto />
      </div>
    )
  }
}
