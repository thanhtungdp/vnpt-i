import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import ControlStationConfig from 'containers/control-station/control-station-config'
import ControlStationTrigger from 'containers/control-station/control-station-trigger'
import ControlStationHistory from 'containers/control-station/control-station-history'

export default props => (
  <Switch>
    <Route
      exact
      path={slug.controlStation.trigger}
      render={matchProps => (
        <ControlStationTrigger {...matchProps} {...props} />
      )}
    />
    <Route
      path={slug.controlStation.config}
      render={matchProps => <ControlStationConfig {...matchProps} {...props} />}
    />
    <Route
      path={slug.controlStation.history}
      render={matchProps => (
        <ControlStationHistory {...matchProps} {...props} />
      )}
    />
  </Switch>
)
