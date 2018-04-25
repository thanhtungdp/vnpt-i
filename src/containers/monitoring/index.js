import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import MonitoringGeneral from './general'
import ViewCamera from './view-camera'

export default props => (
  <Switch>
    <Route
      exact
      path={slug.monitoring.base}
      render={matchProps => <MonitoringGeneral {...matchProps} {...props} />}
    />
    <Route
      path={slug.monitoring.viewCamera}
      render={matchProps => <ViewCamera {...matchProps} {...props} />}
    />
  </Switch>
)
