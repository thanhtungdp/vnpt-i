import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { translate as t } from 'hoc/create-lang'

import {
  warningLevelsNumber,
  warningLevels,
  colorLevels
} from 'constants/warningLevels'
import { Row, Clearfix, Item, BoxNumberView } from './style'
import PropTypes from 'prop-types'

const BoxAnalyticListWrapper = styled.div``

@autobind
export default class BoxAnalyticList extends React.PureComponent {
  static propTypes = {
    fillStatusChange: PropTypes.func
  }

  state = {
    exceeded: -1,
    exceededPreparing: -1,
    exceededTendency: -1,
    good: -1,
    stationsAutoList: [],
    focusStatus: [
      warningLevels.GOOD,
      warningLevels.EXCEEDED,
      warningLevels.EXCEEDED_PREPARING,
      warningLevels.EXCEEDED_TENDENCY
    ]
  }
  async componentWillMount() {
    this.renderMap(this.props.stationsAutoList)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.stationsAutoList.length !== this.state.stationsAutoList.length
    ) {
      // Check if it's a new user, you can also use some unique, like the ID
      this.renderMap(nextProps.stationsAutoList)
    }
  }

  renderMap(stationsAutoList) {
    let res = {
      exceeded: 0,
      exceededPreparing: 0,
      exceededTendency: 0,
      good: 0
    }
    stationsAutoList.forEach(element => {
      let isFind = false
      let warLevel = warningLevels.GOOD
      let measuringLogs =
        element.lastLog && element.lastLog.measuringLogs
          ? element.lastLog.measuringLogs
          : []
      for (let key in measuringLogs) {
        if (
          warningLevelsNumber[warLevel] <
          warningLevelsNumber[measuringLogs[key].warningLevel]
        )
          warLevel = measuringLogs[key].warningLevel
      }
      if (warLevel === warningLevels.EXCEEDED) {
        res.exceeded++
        isFind = true
      }
      if (!isFind && warLevel === warningLevels.EXCEEDED_PREPARING) {
        res.exceededPreparing++
        isFind = true
      }
      if (!isFind && warLevel === warningLevels.EXCEEDED_TENDENCY) {
        res.exceededTendency++
        isFind = true
      }
      if (!isFind) res.good++
    })

    this.setState({
      exceeded: res.exceeded,
      exceededPreparing: res.exceededPreparing,
      exceededTendency: res.exceededTendency,
      good: res.good
    })
  }

  handelFocusStatus(item) {
    let index = this.state.focusStatus.indexOf(item)
    let focusStatus = []
    if (index !== -1)
      focusStatus = this.state.focusStatus.filter(el => el !== item)
    else focusStatus = [...this.state.focusStatus, item]
    this.setState({ focusStatus })
    this.props.fillStatusChange(focusStatus, 'byDataStatus')
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.fillStatusChange(this.state.focusStatus, 'byDataStatus')
    }, 500)
  }

  render() {
    const pfKey = 'map.menuRight.'
    return (
      <BoxAnalyticListWrapper>
        <Row>
          <Item
            onClick={() => {
              this.handelFocusStatus(warningLevels.GOOD)
            }}
          >
            <BoxNumberView
              color={colorLevels.GOOD}
              type={t(pfKey + 'good')}
              number={this.state.good}
              focusStatus={warningLevels.GOOD}
              focusParam={this.state.focusStatus}
            />
          </Item>
          <Item
            onClick={() => {
              this.handelFocusStatus(warningLevels.EXCEEDED)
            }}
          >
            <BoxNumberView
              color={colorLevels.EXCEEDED}
              type={t(pfKey + 'exceeded')}
              number={this.state.exceeded}
              focusStatus={warningLevels.EXCEEDED}
              focusParam={this.state.focusStatus}
            />
          </Item>
        </Row>
        <Clearfix height={8} />
        <Row>
          <Item
            onClick={() => {
              this.handelFocusStatus(warningLevels.EXCEEDED_PREPARING)
            }}
          >
            <BoxNumberView
              color={colorLevels.EXCEEDED_PREPARING}
              type={t(pfKey + 'exceededPreparing')}
              number={this.state.exceededPreparing}
              focusStatus={warningLevels.EXCEEDED_PREPARING}
              focusParam={this.state.focusStatus}
            />
          </Item>
          <Item
            onClick={() => {
              this.handelFocusStatus(warningLevels.EXCEEDED_TENDENCY)
            }}
          >
            <BoxNumberView
              color={colorLevels.EXCEEDED_TENDENCY}
              type={t(pfKey + 'exceededTendency')}
              number={this.state.exceededTendency}
              focusStatus={warningLevels.EXCEEDED_TENDENCY}
              focusParam={this.state.focusStatus}
            />
          </Item>
        </Row>
      </BoxAnalyticListWrapper>
    )
  }
}
