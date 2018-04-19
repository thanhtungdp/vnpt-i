import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import CameraForm from 'containers/camera/camera-form'

export default props => (
  <Switch>
    <Route
      path={slug.camera.camera}
      render={matchProps => <CameraForm {...matchProps} {...props} />}
    />
  </Switch>
)
