import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'

import ManagerRoute from './managerRoute'
import MapRoute from './mapRoute'
import LoginRoute from './loginRoute'

import createProtectedAuth from 'shared/hoc/protected-auth'

const ManagerRouteProtected = createProtectedAuth(ManagerRoute)

@autobind
export default class RouteDefault extends React.Component {
  render() {
    return (
      <div>
        <Route path={slug.login} exact component={LoginRoute} />
        <Route path={slug.map.base} exact component={MapRoute} />
        <Route path="/" component={ManagerRouteProtected} />
      </div>
    )
  }
}

//
