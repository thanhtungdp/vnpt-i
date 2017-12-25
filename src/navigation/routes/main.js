import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import PageSidebarLayout from 'layout/default-sidebar-layout'

import LandfillList from 'containers/landfill/landfill-list'
import LandfillCreate from 'containers/landfill/landfill-create'
import TransitStationList from 'containers/transit-station/transit-station-list'
import MapDefault from 'containers/map/map-default'

@autobind
export default class RouteDefautl extends React.Component {
  render() {
    return (
      <PageSidebarLayout>
        <Route exact path="/" component={OverviewDashboard} />
        <Route exact path={slug.landFill.list} component={LandfillList} />
        <Route exact path={slug.landFill.create} component={LandfillCreate} />
        <Route
          exact
          path={slug.transitStation.list}
          component={TransitStationList}
        />
        <Route exact path={slug.map.base} component={MapDefault} />
      </PageSidebarLayout>
    )
  }
}
