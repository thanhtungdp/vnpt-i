import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { SHAPE } from 'themes/color'
import { translate as t } from 'hoc/create-lang'
import stationStatus from 'constants/stationStatus'
import { Row, Clearfix, Item, BoxNumberView } from './style'
import PropTypes from 'prop-types'

const BoxAnalyticListWrapper = styled.div``

@autobind
export default class BoxAnalyticList extends React.PureComponent {
  static propTypes = {
    fillStatusChange: PropTypes.func
  }

  state = {
    dataLoss: -1,
    notUse: -1,
    connected: -1,
    stationsAutoList: [],
    focusStatus: [
      stationStatus.DATA_LOSS,
      stationStatus.NOT_USE,
      stationStatus.CONNECTED
    ]
  }

  async componentWillMount() {
    this.rendermap(this.props.stationsAutoList)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.stationsAutoList.length !== this.state.stationsAutoList.length
    ) {
      // Check if it's a new user, you can also use some unique, like the ID
      this.rendermap(nextProps.stationsAutoList)
    }
  }

  rendermap(stationsAutoList) {
    let res = {
      dataLoss: 0,
      notUse: 0,
      connected: 0
    }
    stationsAutoList.forEach(element => {
      if (element.status === stationStatus.DATA_LOSS) {
        res.dataLoss++
      } else if (element.status === stationStatus.NOT_USE) {
        res.notUse++
      } else res.connected++
    })
    this.setState({
      dataLoss: res.dataLoss,
      notUse: res.notUse,
      connected: res.connected
    })
  }

  handelFocusStatus(item) {
    let index = this.state.focusStatus.indexOf(item)
    let focusStatus = []
    if (index !== -1)
      focusStatus = this.state.focusStatus.filter(el => el !== item)
    else focusStatus = [...this.state.focusStatus, item]
    this.setState({ focusStatus })
    this.props.fillStatusChange(focusStatus, 'byStationStatus')
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.fillStatusChange(this.state.focusStatus, 'byStationStatus')
    }, 500)
  }

  render() {
    const pfKey = 'map.menuRight.'
    return (
      <BoxAnalyticListWrapper>
        <Row>
          <Item
            onClick={() => {
              this.handelFocusStatus(stationStatus.DATA_LOSS)
            }}
          >
            <BoxNumberView
              color={SHAPE.RED}
              type={t(pfKey + 'dataLoss')}
              number={this.state.dataLoss}
              focusStatus={stationStatus.DATA_LOSS}
              focusParam={this.state.focusStatus}
            />
          </Item>
          <Item
            onClick={() => {
              this.handelFocusStatus(stationStatus.NOT_USE)
            }}
          >
            <BoxNumberView
              color={SHAPE.YELLOW}
              type={t(pfKey + 'notUse')}
              number={this.state.notUse}
              focusStatus={stationStatus.NOT_USE}
              focusParam={this.state.focusStatus}
            />
          </Item>
        </Row>
        <Clearfix height={8} />
        <Row>
          <Item
            isFullWidth
            onClick={() => {
              this.handelFocusStatus(stationStatus.CONNECTED)
            }}
          >
            <BoxNumberView
              color={SHAPE.GREEN}
              type={t(pfKey + 'connected')}
              number={this.state.connected}
              focusStatus={stationStatus.CONNECTED}
              focusParam={this.state.focusStatus}
            />
          </Item>
        </Row>
      </BoxAnalyticListWrapper>
    )
  }
}
