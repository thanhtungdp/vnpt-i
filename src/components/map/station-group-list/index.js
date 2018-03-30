import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StationGroupItem from './station-group-item'

const StationsGroupListWrapper = styled.div`
  .stationGroupItem {
    margin-bottom: 16px;
    &:last-child {
      margin-bototm: 0px;
    }
  }
`

@autobind
export default class StationsGroupList extends React.PureComponent {
  static propTypes = {
    stationGroups: PropTypes.arrayOf(
      PropTypes.shape(StationGroupItem.propTypes)
    ),
    stationSelected: PropTypes.object,
    onSelectStation: PropTypes.func
  }
  render() {
    return (
      <StationsGroupListWrapper>
        {this.props.stationGroups.map((stationGroup, index) => (
          <div className="stationGroupItem">
            <StationGroupItem
              key={index}
              stationType={stationGroup.stationType}
              stations={stationGroup.stations}
              stationSelected={this.props.stationSelected}
              onSelectStation={this.props.onSelectStation}
            />
          </div>
        ))}
      </StationsGroupListWrapper>
    )
  }
}
