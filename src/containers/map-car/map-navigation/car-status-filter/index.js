import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import Clearfix from 'components/elements/clearfix'
import NavigationItemCollapse from 'components/navigation/navigation-item-collapse'
import markerIcon from 'themes/markerIcon'
import update from 'react-addons-update'
import CheckBoxItem from 'components/map/filter/check-box-item'
import Icon from 'themes/icon'

@autobind
export default class CarStatusFilter extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    markerFilter: {
      isCar: false,
      isOffline: false,
      isRunning: false,
      isRunningPlan: false,
      isWarning: false
    }
  }

  toggleFilter(key, e) {
    this.setState(
      update(this.state, {
        markerFilter: {
          [key]: {
            $set: e.isChecked
          }
        }
      }),
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.markerFilter)
        }
      }
    )
  }

  renderCheckBox(icon, label, key) {
    return (
      <CheckBoxItem
        image={icon}
        label={label}
        onChange={e => this.toggleFilter(key, e)}
        value={this.state.markerFilter[key]}
      />
    )
  }

  render() {
    return (
      <NavigationItemCollapse icon={Icon.car} label="Trạng thái xe">
        <Clearfix height={8} />
        {this.renderCheckBox(
          markerIcon.carOffline,
          'Xe không chạy',
          'isOffline'
        )}
        {this.renderCheckBox(
          markerIcon.carRunning,
          'Xe đang chạy',
          'isRunning'
        )}
        {this.renderCheckBox(
          markerIcon.carRunningPlan,
          'Xe đang trong tuyến',
          'isRunningPlan'
        )}
        {this.renderCheckBox(markerIcon.carWarning, 'Xe vi phạm', 'isWarning')}
      </NavigationItemCollapse>
    )
  }
}
