import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'

import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import LoginRoute from './loginRoute'
import LayoutRoute from 'layout/default-sidebar-layout/routeCombine'
import MeasuringRoute from 'containers/manager/measuring'
import StationAutoRoute from 'containers/manager/station-auto'
import StationTypeRoute from 'containers/manager/station-type'
import OnlineMonitoring from 'containers/online-monitoring'
import Map from 'containers/map'
import MinutesDataSearch from '../../containers/data-search/minutes-data-search'
import AvgDataForm from 'containers/avg-search/avg-data-form'

@autobind
export default class RouteDefault extends React.Component {
  render() {
    return (
      <div>
        <LayoutRoute path="/" exact component={OverviewDashboard} />
        <Route path={slug.map.base} exact component={Map} />
        <LayoutRoute path={slug.measuring.base} component={MeasuringRoute} />
        <LayoutRoute
          path={slug.stationAuto.base}
          component={StationAutoRoute}
        />
        <LayoutRoute
          path={slug.stationType.base}
          component={StationTypeRoute}
        />
        <LayoutRoute
          path={slug.onlineMonitoring.base}
          component={OnlineMonitoring}
        />
        <LayoutRoute
          path={slug.dataSearch.base}
          component={MinutesDataSearch}
        />
        <LayoutRoute path={slug.avgSearch.base} component={AvgDataForm} />
        <Route path={slug.login} exact component={LoginRoute} />
      </div>
    )
  }
}

//
