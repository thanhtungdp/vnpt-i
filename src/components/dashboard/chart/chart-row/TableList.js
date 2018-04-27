import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import stationStatus from 'constants/stationStatus'
import { translate } from 'hoc/create-lang'
import {
  warningLevelsNumber,
  warningLevels,
  colorLevels
} from 'constants/warningLevels'

const Status = styled.div`
  width: 8px;
  height: 8px;
  background-color: #1dce6c;
  border-radius: 4px;
`

const Row = styled.div`
  display: flex;
  padding: 8px 0px;
  transition: all 0.2s linear;
  ${props =>
    props.isActive
      ? `
      background-color: #EFF0F0;
      > div {
        color: #0052CC;
      }
      `
      : ''} border-bottom: 1px solid rgba(241, 241, 241, .9);
  &:hover {
    background-color: rgba(241, 241, 241, 0.7);
    cursor: pointer;
  }
`

const Column = styled.div`
  ${props => (props.isTh ? 'font-weight: 600;' : '')};
`

const IndexColumn = Column.extend`
  width: 30px;
  text-align: center;
  font-weight: 600;
`

const NameColumn = Column.extend`
  flex: 1;
  padding-left: 8px;
`

const StatusColumn = Column.extend`
  width: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class TableListCustom extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        key: PropTypes.string
      })
    ),
    currentItem: PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string
    }),
    onChangeItem: PropTypes.func
  }

  state = {
    stationStatus: stationStatus.GOOD
  }

  async componentWillMount() {}

  renderStationStatus(station) {
    if (station.status === stationStatus.DATA_LOSS)
      return '(' + translate('dashboard.dataLoss') + ')'
    if (station.status === stationStatus.NOT_USE)
      return '(' + translate('dashboard.notUse') + ')'
    return ''
  }

  renderStatusColor(item) {
    if (item.lastLog) {
      let warLevel = warningLevels.GOOD
      let measuringLogs = item.lastLog.measuringLogs
      for (let key in measuringLogs) {
        if (
          warningLevelsNumber[warLevel] <
          warningLevelsNumber[measuringLogs[key].warningLevel]
        )
          warLevel = measuringLogs[key].warningLevel
      }
      return colorLevels[warLevel]
    }
    return colorLevels.GOOD
  }

  render() {
    return (
      <div>
        <Row>
          <IndexColumn isTh>#</IndexColumn>
          <NameColumn isTh>{translate('dashboard.tableList.name')}</NameColumn>
          <StatusColumn isTh>
            {translate('dashboard.tableList.dataStatus')}
          </StatusColumn>
        </Row>
        {this.props.data.map((item, index) => (
          <Row
            onClick={e => this.props.onChangeItem(e, item)}
            key={item.key}
            isActive={this.props.currentItem.key === item.key}
          >
            <IndexColumn>{index + 1}</IndexColumn>
            <NameColumn className="name">
              {item.name} {this.renderStationStatus(item)}{' '}
            </NameColumn>
            <StatusColumn>
              {' '}
              <Status
                style={{
                  backgroundColor: this.renderStatusColor(item)
                }}
              />
            </StatusColumn>
          </Row>
        ))}
      </div>
    )
  }
}
