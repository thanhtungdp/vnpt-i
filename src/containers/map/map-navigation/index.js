import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import NavigationLayout from 'layout/navigation-layout/index'
import MarkerFilter from './marker-filter'

@autobind
export default class MapNavigation extends React.PureComponent {
  static propTypes = {
    onChangeMarkerFilter: PropTypes.func
  }

  render() {
    return (
      <NavigationLayout>
        <MarkerFilter onChange={this.props.onChangeMarkerFilter} />
      </NavigationLayout>
    )
  }
}