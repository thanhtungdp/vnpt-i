import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import NavigationLayout from 'layout/navigation-layout/index'
import CarFilter from './car-status-filter'
import StationFilter from './station-filter'
import SmartFilterTree from './smart-filter-tree'

@autobind
export default class MapNavigation extends React.PureComponent {
  static propTypes = {
    onChangeMarkerFilter: PropTypes.func,
    markerFilter: PropTypes.object
  }

  handleChangeFilter(newFilter = {}) {
    this.props.onChangeMarkerFilter({
      ...this.props.markerFilter,
      ...newFilter
    })
  }

  render() {
    return (
      <NavigationLayout>
        <StationFilter
          markerFilter={this.props.markerFilter}
          onChange={this.handleChangeFilter}
        />
        <CarFilter
          markerFilter={this.props.markerFilter}
          onChange={this.handleChangeFilter}
        />
        <SmartFilterTree />
      </NavigationLayout>
    )
  }
}
