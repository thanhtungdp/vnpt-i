import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import Clearfix from 'components/elements/clearfix'
import NavigationItemCollapse from 'components/navigation/navigation-item-collapse'
import markerIcon from 'themes/markerIcon'
import update from 'react-addons-update'
import CheckBoxItem from 'components/map/filter/check-box-item'
import BillingIcon from '@atlaskit/icon/glyph/billing'

@autobind
export default class MapFilter extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      markerFilter: {
        isTransitStation: props.markerFilter.isTransitStation,
        isAppointmentStation: props.markerFilter.isAppointmentStation,
        isBurialStation: props.markerFilter.isBurialStation
      }
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
      <NavigationItemCollapse
        isOpen
        icon={<BillingIcon label="" />}
        label="Các điểm trạm"
      >
        <Clearfix height={8} />
        {this.renderCheckBox(
          markerIcon.appointmentStation,
          'Điểm hẹn',
          'isAppointmentStation'
        )}
        <Clearfix height={8} />
        {this.renderCheckBox(
          markerIcon.transitStation,
          'Trạm trung chuyển',
          'isTransitStation'
        )}
        <Clearfix height={8} />
        {this.renderCheckBox(
          markerIcon.burialStation,
          'Bãi chôn lấp',
          'isBurialStation'
        )}
      </NavigationItemCollapse>
    )
  }
}
