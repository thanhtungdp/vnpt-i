import React, { Component } from 'react'
import Page from '@atlaskit/page'
import { autobind } from 'core-decorators'
import SidebarNavigation from './map-navigation'
import MapDefault from './map-default'

@autobind
export default class MapCarContainer extends Component {
  state = {
    navigationWidth: 300
  }
  render() {
    return (
      <Page
        navigationWidth={this.state.navigationWidth}
        navigation={<SidebarNavigation />}
      >
        <MapDefault markerFilter={this.state.markerFilter} />
      </Page>
    )
  }
}
