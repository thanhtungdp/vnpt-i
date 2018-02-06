import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import NavigationLayout from 'layout/navigation-layout/index'
import update from 'react-addons-update'
import NavigationItemCollapse from 'components/navigation/navigation-item-collapse'
import Clearfix from 'components/elements/clearfix'
import CheckBoxItem from 'components/map/filter/check-box-item'
import { getStationAutos } from 'api/StationAuto'
import { getStationTypes } from 'api/CategoryApi'
import { Input } from 'antd'
import Icon from 'themes/icon'

@autobind
export default class MapNavigation extends React.PureComponent {
  static propTypes = {
    onChangeMarkerFilter: PropTypes.func,
    stationAutoMarker: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
      stationAutoList: PropTypes.array,
      stationAutoListFull: PropTypes.array,
      stationType: PropTypes.array,
      isLoaded: false
    }
  }

  async componentDidMount() {
    const stationAutoList = await getStationAutos({}, {})
    const stationType = await getStationTypes({}, {})
    this.setState({
      stationAutoList: stationAutoList.data,
      stationAutoListFull: stationAutoList.data,
      stationType: stationType.data,
      isLoaded: true
    })
  }

  toggleMarkerFilter(key, e) {
    let stationAutoMarker = this.props.stationAutoMarker.map(item => {
      if (item.key == key) item.visible = e.isChecked
      return item
    })
    this.props.onChangeMarkerFilter(stationAutoMarker)
  }

  renderCheckBox(icon, label, key) {
    return (
      <CheckBoxItem
        value={true}
        //image={icon}
        label={label}
        onChange={e => this.toggleMarkerFilter(key, e)}
        //value={this.state.markerFilter[key]}
      />
    )
  }

  render() {
    return (
      <NavigationLayout>
        <div>
          <Input.Search
            placeholder="Search station"
            onSearch={value => {
              let stationAutoList = this.state.stationAutoListFull
              if (value) {
                stationAutoList = stationAutoList.filter(item => {
                  if (
                    item.name.indexOf(value) > -1 ||
                    item.address.indexOf(value) > -1
                  )
                    return true
                })
              }
              this.setState({ stationAutoList: stationAutoList })
            }}
            style={{ width: '100%' }}
          />
        </div>
        <Clearfix height={8} />
        {this.state.isLoaded &&
          this.state.stationType.map(item => {
            console.log(this.state.stationAutoList)
            let stationAutoFilter = this.state.stationAutoList.filter(
              station => station.stationType.key == item.key
            )
            return (
              <div>
                <Clearfix height={8} />
                <NavigationItemCollapse
                  icon={Icon.quizLists}
                  isOpen
                  label={item.name + ' (' + stationAutoFilter.length + ')'}
                >
                  {stationAutoFilter.map(station => {
                    return (
                      <div>
                        <Clearfix height={8} />
                        {this.renderCheckBox(
                          station.image,
                          station.name,
                          station.key
                        )}
                      </div>
                    )
                  })}
                </NavigationItemCollapse>
              </div>
            )
          })}
      </NavigationLayout>
    )
  }
}
