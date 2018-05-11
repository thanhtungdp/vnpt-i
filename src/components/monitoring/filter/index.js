import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { Input } from 'antd'
import SelectAnt from 'components/elements/select-ant'
import SelectType from 'components/elements/select-station-type'
import Clearfix from 'components/elements/clearfix'
import update from 'react-addons-update'
// import { GROUP_OPTIONS, ORDER_OPTIONS } from './options'
import { translate } from 'hoc/create-lang'

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
          $set: typeof value === 'object' ? value.target.value : value
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
        <div style={{ width: '25%' }}>
          <Input
            placeholder="Search"
            {...this.getPropsSelect(
              'search',
              translate('monitoring.keywordSearch')
            )}
          />
        </div>
        <Clearfix width={8} />
        <SelectAnt
          style={{ width: '25%' }}
          //  options={GROUP_OPTIONS}
          options={[
            {
              value: 'group',
              name: translate('monitoring.group')
            },
            {
              value: 'ungroup',
              name: translate('monitoring.ungroup')
            }
          ]}
          {...this.getPropsSelect('group', translate('monitoring.selectGroup'))}
        />
        <Clearfix width={8} />
        <SelectAnt
          style={{ width: '25%' }}
          //  options={ORDER_OPTIONS}
          options={[
            {
              value: 'name',
              name: translate('monitoring.sortByStationName')
            },
            {
              value: 'number',
              name: translate('monitoring.sortByValues')
            }
          ]}
          {...this.getPropsSelect('order', translate('monitoring.selectOrder'))}
        />
        <Clearfix width={8} />
        <SelectType
          style={{ width: '25%' }}
          placeholder="Select station type"
          isShowAll
          {...this.getPropsSelect(
            'stationType',
            translate('monitoring.selectSationType')
          )}
        />
      </MonitoringHeaderFilterWrapper>
    )
  }
}
