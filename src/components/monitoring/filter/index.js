import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import SelectAnt from 'components/elements/select-ant'
import SelectType from 'components/elements/select-station-type'
import Clearfix from 'components/elements/clearfix'
import update from 'react-addons-update'
import { GROUP_OPTIONS, ORDER_OPTIONS } from './options'

const MonitoringHeaderFilterWrapper = styled.div`
  display: flex;
  flex: 1;
`

@autobind
export default class MonitoringHeaderFilter extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  }

  handleChange(key, value) {
    this.props.onChange(
      update(this.props.filter, {
        [key]: {
          $set: value
        }
      })
    )
  }

  getPropsSelect(key, placeholder) {
    return {
      value: this.props.filter[key],
      onChange: value => this.handleChange(key, value),
      placeholder
    }
  }

  render() {
    return (
      <MonitoringHeaderFilterWrapper>
        <SelectAnt
          style={{ width: '30%' }}
          options={GROUP_OPTIONS}
          {...this.getPropsSelect('group', 'Select group')}
        />
        <Clearfix width={16} />
        <SelectAnt
          style={{ width: '30%' }}
          options={ORDER_OPTIONS}
          {...this.getPropsSelect('order', 'Select order')}
        />
        <Clearfix width={16} />
        <SelectType
          style={{ width: '30%' }}
          placeholder="Select station type"
          isShowAll
          {...this.getPropsSelect('stationType', 'Select stationtype')}
        />
      </MonitoringHeaderFilterWrapper>
    )
  }
}
