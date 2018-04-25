import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import CameraList from 'containers/camera/camera-list'

export default props => (
  <Switch>
    <Route
      path={slug.camera.camera}
      render={matchProps => <CameraList {...matchProps} {...props} />}
    />
  </Switch>
)
