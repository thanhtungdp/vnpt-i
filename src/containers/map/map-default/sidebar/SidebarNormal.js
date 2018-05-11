import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import BoxAnalyticList from '../components/box-analytic-list'
import SearchStation from '../components/search-station'
import connectWindowHeight from '../../hoc-window-height'

const SidebarListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Clearfix = styled.div`
  height: 8px;
`

@connectWindowHeight
@autobind
export default class SidebarList extends React.PureComponent {
  static propTypes = {
    analytic: PropTypes.shape({
      stationsAutoList: PropTypes.array,
      fillStatusChange: PropTypes.func
    }),
    searchStation: PropTypes.shape({
      onSelectStation: PropTypes.func,
      stationSelected: PropTypes.object,
      stationsAuto: PropTypes.array
    })
  }

  render() {
    return (
      <SidebarListWrapper className="fadeIn animated">
        <BoxAnalyticList dataStatus={this.props.analytic} />
        <Clearfix />
        <SearchStation {...this.props.searchStation} />
      </SidebarListWrapper>
    )
  }
}
