import React from 'react'
import { autobind } from 'core-decorators'
import Breadcrumb from './breadcrumb'
import CameraList from 'containers/camera/camera-list'

@autobind
export default class ViewCamera extends React.PureComponent {
  renderBreadcrumb(stationName) {
    return (
      <Breadcrumb
        items={[
          'list',
          {
            id: 'stationName',
            name: stationName
          }
        ]}
      />
    )
  }
  render() {
    return <CameraList breadcrumb={this.renderBreadcrumb} />
  }
}
