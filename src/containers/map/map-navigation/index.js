import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import NavigationLayout from 'layout/navigation-layout/index'
import NavigationItemCollapse from 'components/navigation/navigation-item-collapse'

@autobind
export default class MapNavigation extends React.PureComponent {
  static propTypes = {
    onChangeMarkerFilter: PropTypes.func,
    markerFilter: PropTypes.object
  }

  render() {
    return (
      <NavigationLayout>
        <NavigationItemCollapse label="Location station auto ">
        </NavigationItemCollapse>
      </NavigationLayout>
    )
  }
}
