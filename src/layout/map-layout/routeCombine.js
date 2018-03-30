import { Route } from 'react-router-dom'
import React from 'react'
import MapLayout from './index'

// Tạo ra route dành cho layout, để các component sử dụng chung
export default ({ component: ChildComponent, ...otherProps }) => (
  <Route
    {...otherProps}
    render={matchProps => (
      <MapLayout>
        <ChildComponent {...matchProps} />
      </MapLayout>
    )}
  />
)
