import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import Clearfix from 'components/elements/clearfix'
import NavigationItemCollapse from 'components/navigation/navigation-item-collapse'
import markerIcon from 'themes/markerIcon'
import update from 'react-addons-update'
import CheckBoxItem from './CheckBoxItem'
import BillingIcon from '@atlaskit/icon/glyph/billing'

@autobind
export default class MapFilter extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    markerFilter: {
      isXe: false
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
        this.props.onChange(this.state.markerFilter)
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
      <NavigationItemCollapse icon={<BillingIcon />} label="Các xe">
        <Clearfix height={8} />
        {this.renderCheckBox(
          markerIcon.car,
          'Xe',
          'isXe'
        )}

      </NavigationItemCollapse>
    )
  }
}
