import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'

import ManagerRoute from './managerRoute'
import LoginRoute from './loginRoute'
import MapContainer from 'containers/map'
import MapCarContainer from 'containers/map-car'

import createProtectedAuth from 'shared/hoc/protected-auth'

const ManagerRouteProtected = createProtectedAuth(ManagerRoute)

@autobind
export default class RouteDefault extends React.Component {
  render() {
    return (
      <div>
        <Route path={slug.login} exact component={LoginRoute} />
        <Route path={slug.map.base} exact component={MapContainer} />
        <Route path={slug.map.car} exact component={MapCarContainer} />
        <Route path="/" component={ManagerRouteProtected} />
      </div>
    )
  }
}

//
