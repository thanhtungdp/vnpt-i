import React, { Component } from 'react'
import Page from '@atlaskit/page'
import { autobind } from 'core-decorators'
import SidebarNavigation from './map-navigation'
import MapDefault from './map-default'

@autobind
export default class MapCarContainer extends Component {
  state = {
    navigationWidth: 300,
    stationAutoMarker: []
  }

  handleGetStationAuto(stationAutoMarker) {
    console.log(stationAutoMarker)
    this.setState({ stationAutoMarker })
  }

  render() {
    return (
      <Page
        navigationWidth={this.state.navigationWidth}
        navigation={
          <SidebarNavigation
            stationAutoMarker={this.state.stationAutoMarker}
            onChangeMarkerFilter={this.handleGetStationAuto}
          />
        }
      >
        <MapDefault
          stationAutoMarker={this.state.stationAutoMarker}
          handleGetStationAuto={this.handleGetStationAuto}
        />
      </Page>
    )
  }
}
