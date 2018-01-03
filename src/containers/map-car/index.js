import React, { Component } from 'react'
import Page from '@atlaskit/page'
import { autobind } from 'core-decorators'
import SidebarNavigation from './map-navigation'
import MapDefault from './map-default'

@autobind
export default class MapCarContainer extends Component {
  state = {
    navigationWidth: 300,
    markerFilter: {
      isTransitStation: true,
      // isAppointmentStation: true,
      // isBurialStation: true
    }
  }

  handleChangeMarkerFilter(markerFilter) {
    this.setState({ markerFilter })
  }

  render() {
    return (
      <Page
        navigationWidth={this.state.navigationWidth}
        navigation={
          <SidebarNavigation
            markerFilter={this.state.markerFilter}
            onChangeMarkerFilter={this.handleChangeMarkerFilter}
          />
        }
      >
        <MapDefault markerFilter={this.state.markerFilter} />
      </Page>
    )
  }
}
