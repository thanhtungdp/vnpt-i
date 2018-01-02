import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import Clearfix from 'components/elements/clearfix'
import NavigationItemCollapse from 'components/navigation/navigation-item-collapse'
import update from 'react-addons-update'
import CheckBoxItem from './CheckBoxItem'
import Icon from "themes/icon"

@autobind
export default class MapFilter extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    markerFilter: {
      isXe: false,
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
        if(this.props.onChange){
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
      <NavigationItemCollapse
        isOpen
        icon={Icon.direction}
        label="Danh sách lộ trình"
      >
        <Clearfix height={8} />
        {this.renderCheckBox(null, 'Lộ trình 1', 'lotirnh1')}
        {this.renderCheckBox(null, 'Lộ trình 2', 'lotirnh1')}
        {this.renderCheckBox(null, 'Lộ trình 3', 'lotirnh1')}
      </NavigationItemCollapse>
    )
  }
}
