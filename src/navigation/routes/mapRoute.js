import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'

import MapContainer from 'containers/map'

@autobind
export default class MapRoute extends React.Component {
  render() {
    return <div>
      <Route extract path="/" component={MapContainer} />
    </div>
  }
}
