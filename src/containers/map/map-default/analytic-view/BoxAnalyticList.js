import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import BoxNumberView from 'components/map/box-number-view'
import { SHAPE } from 'themes/color'
import { translate as t } from 'hoc/create-lang'
import stationStatus from 'constants/stationStatus'
import { warningLevelsNumber, warningLevels } from 'constants/warningLevels'
import PropTypes from 'prop-types'

const BoxAnalyticListWrapper = styled.div``

const Row = styled.div`
  display: flex;
  margin-left: -4px;
  margin-right: -4px;
`

const Item = styled.div`
  padding: 0px 4px;
  width: 33.3%;
`

const Clearfix = styled.div`
  height: 8px;
`

@autobind
export default class BoxAnalyticList extends React.PureComponent {
  static propTypes = {
    fillStatusChange: PropTypes.func
  }

  state = {
    dataLoss: -1,
    notUse: -1,
    exceeded: -1,
    exceededPreparing: -1,
    exceededTendency: -1,
    good: -1,
    stationsAutoList: [],
    focusStatus: [
      stationStatus.DATA_LOSS,
      stationStatus.NOT_USE,
      warningLevels.GOOD,
      warningLevels.EXCEEDED,
      warningLevels.EXCEEDED_PREPARING,
      warningLevels.EXCEEDED_TENDENCY
    ]
  }
  async componentWillMount() {}

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
      exceeded: 0,
      exceededPreparing: 0,
      exceededTendency: 0,
      good: 0
    }
    stationsAutoList.forEach(element => {
      let isFind = false
      if (element.status === stationStatus.DATA_LOSS) {
        res.dataLoss++
        isFind = true
      }
      if (!isFind && element.status === stationStatus.NOT_USE) {
        res.notUse++
        isFind = true
      }

      if (!isFind) {
        let warLevel = warningLevels.GOOD
        let measuringLogs = element.lastLog.measuringLogs
        for (var key in measuringLogs) {
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
      }
    })

    this.setState({
      dataLoss: res.dataLoss,
      notUse: res.notUse,
      exceeded: res.exceeded,
      exceededPreparing: res.exceededPreparing,
      exceededTendency: res.exceededTendency,
      good: res.good
    })
  }

  handelFocusStatus(item) {
    let index = this.state.focusStatus.indexOf(item)
    let res
    if (index !== -1) res = this.state.focusStatus.filter(el => el !== item)
    else res = [...this.state.focusStatus, item]
    this.setState(
      {
        focusStatus: res
      },
      () => {
        if (this.props.fillStatusChange)
          this.props.fillStatusChange(this.state.focusStatus)
      }
    )
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
              color={SHAPE.GREEN}
              type={t(pfKey + 'good')}
              number={this.state.good}
              focusStatus={warningLevels.GOOD}
              focusParam={this.state.focusStatus}
            />
          </Item>
          <Item
            onClick={() => {
              this.handelFocusStatus(stationStatus.DATA_LOSS)
            }}
          >
            <BoxNumberView
              color={SHAPE.GREEN}
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
              color={SHAPE.RED}
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
            onClick={() => {
              this.handelFocusStatus(warningLevels.EXCEEDED)
            }}
          >
            <BoxNumberView
              color={SHAPE.ORANGE}
              type={t(pfKey + 'exceeded')}
              number={this.state.exceeded}
              focusStatus={warningLevels.EXCEEDED}
              focusParam={this.state.focusStatus}
            />
          </Item>
          <Item
            onClick={() => {
              this.handelFocusStatus(warningLevels.EXCEEDED_PREPARING)
            }}
          >
            <BoxNumberView
              color={SHAPE.YELLOW}
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
              color={SHAPE.YELLOW}
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
