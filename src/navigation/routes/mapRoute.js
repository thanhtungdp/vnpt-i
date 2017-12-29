import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'

import MapContainer from 'containers/map'
import MapCarContainer from 'containers/map-car'
import slug from '../../constants/slug'

@autobind
export default class MapRoute extends React.Component {
  render() {
    return (
      <div>
        <Route path={slug.map.base} exact component={MapContainer} />
        <Route path={slug.map.car} exact component={MapCarContainer} />
      </div>
    )
  }
}
