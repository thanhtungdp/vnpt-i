import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import { autobind } from 'core-decorators'
import { Input } from 'antd'
import BoxLayout from 'components/map/box-white-layout'
import StationGroupList from 'components/map/station-group-list'
import Clearfix from 'components/elements/clearfix'
import _ from 'lodash'
import styled from 'styled-components'
import SelectStationType from './SelectStationType'
import { translate } from 'hoc/create-lang'

const WrapperList = styled.div`
  overflow: scroll;
  flex: 1;
`

@withRouter
@autobind
export default class SidebarList extends React.PureComponent {
  static propTypes = {
    stationsAuto: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    stationSelected: PropTypes.object,
    onSelectStation: PropTypes.func
  }

  state = {
    stationType: '',
    filterText: ''
  }

  async componentDidMount() {
    const stationType = queryString.parse(this.props.location.search)
    if (stationType) {
      this.handleChangeStationType(stationType.Id) // Lấy mã loại trạm
    }
  }

  handleChangeStationType(stationType) {
    if (typeof stationType !== 'undefined') {
      this.setState({ stationType })
    }
  }

  handleChangeSearch(e) {
    this.setState({ filterText: e.target.value })
  }

  // componentWillReceiveProps(nextProps) {
  //   debugger
  //   if (nextProps.stationsAuto.length != this.props.stationsAuto.length) // Check if it's a new user, you can also use some unique, like the ID
  //   {

  //     this.getStationGroups()
  //   }
  // }

  getStationGroups() {
    let stationsAuto = this.props.stationsAuto.filter(item => item.visible)
    if (this.state.filterText !== '') {
      stationsAuto = stationsAuto.filter(
        sAuto =>
          sAuto.name
            .toLowerCase()
            .indexOf(this.state.filterText.toLowerCase()) > -1
      )
    }
    if (this.state.stationType) {
      stationsAuto = stationsAuto.filter(
        sAuto => sAuto.stationType.key === this.state.stationType
      )
    }
    const groupStationAutoObject = _.groupBy(stationsAuto, 'stationType.name')
    return Object.keys(groupStationAutoObject).map(stationType => {
      return {
        stationType: stationType,
        stations: groupStationAutoObject[stationType]
      }
    })
  }

  render() {
    return (
      <BoxLayout
        style={{ flex: 1 }}
        onlyTitle
        noPadding
        noTitlePadding
        title={
          <SelectStationType
            onChange={this.handleChangeStationType}
            value={this.state.stationType}
          />
        }
        containerStyle={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 8px'
        }}
      >
        <Input.Search
          placeholder={translate('map.menuLeft.stationSearch')}
          onChange={this.handleChangeSearch}
          style={{ width: '100%' }}
          value={this.state.filterText}
        />
        <Clearfix height={8} />
        <WrapperList>
          <StationGroupList
            stationSelected={this.props.stationSelected}
            stationGroups={this.getStationGroups()}
            onSelectStation={this.props.onSelectStation}
          />
        </WrapperList>
      </BoxLayout>
    )
  }
}
