import React, { Component } from 'react'
import Page from '@atlaskit/page'
import { autobind } from 'core-decorators'
import SidebarNavigation from './map-navigation'
import MapDefault from './map-default'

@autobind
export default class MapContainer extends Component {
  state = {
    navigationWidth: 300,
    markerFilter: {}
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
            onChangeMarkerFilter={this.handleChangeMarkerFilter}
          />
        }
      >
        <MapDefault markerFilter={this.state.markerFilter} />
      </Page>
    )
  }
}
