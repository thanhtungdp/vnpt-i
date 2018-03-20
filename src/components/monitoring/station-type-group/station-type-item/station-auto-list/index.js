import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import StationAuto from '../station-auto'

@autobind
export default class StationAutoList extends React.PureComponent {
  static propTypes = {
    stationAutoList: PropTypes.arrayOf(PropTypes.shape(StationAuto.props))
  }
  render() {
    return (
      <div>
        {this.props.stationAutoList.map((item, index) => (
          <StationAuto {...item} orderNumber={index + 1} />
        ))}
      </div>
    )
  }
}
