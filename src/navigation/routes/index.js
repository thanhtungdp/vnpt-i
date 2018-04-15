import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import LoginRoute from './loginRoute'
import LayoutRoute from 'layout/default-sidebar-layout/routeCombine'
import MapLayoutRoute from 'layout/map-layout/routeCombine'

import MeasuringRoute from 'containers/manager/measuring'
import StationAutoRoute from 'containers/manager/station-auto'
import StationTypeRoute from 'containers/manager/station-type'
import OnlineMonitoring from 'containers/online-monitoring'
import Map from 'containers/map'
import DataSearch from 'containers/search/data-search'
import AvgSearch from 'containers/search/avg-search'
import Monitoring from 'containers/monitoring'
import EmailConfirm from 'containers/auth/reset-password/email-confirm'
import CodeConfirm from 'containers/auth/reset-password/code-confirm'
import ResetPassword from 'containers/auth/reset-password'
import UserRoute from 'containers/user'
import RoleRoute from 'containers/role'
import ControlStation from 'containers/control-station'

@autobind
export default class RouteDefault extends React.Component {
  render() {
    return (
      <div>
        <LayoutRoute path="/" exact component={OverviewDashboard} />
        <MapLayoutRoute path={slug.map.base} exact component={Map} />
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
        <LayoutRoute path={slug.monitoring.base} component={Monitoring} />
        <LayoutRoute path={slug.dataSearch.base} component={DataSearch} />
        <LayoutRoute path={slug.avgSearch.base} component={AvgSearch} />
        <Route path={slug.login} component={LoginRoute} />
        <LayoutRoute path={slug.user.base} component={UserRoute} />
        <LayoutRoute path={slug.role.base} component={RoleRoute} />

        <LayoutRoute
          path={slug.controlStation.base}
          component={ControlStation}
        />
        <Route path={slug.password.emailConfirm} component={EmailConfirm} />
        <Route path={slug.password.codeConfirm} component={CodeConfirm} />
        <Route path={slug.user.resetPassword} component={ResetPassword} />
      </div>
    )
  }
}
