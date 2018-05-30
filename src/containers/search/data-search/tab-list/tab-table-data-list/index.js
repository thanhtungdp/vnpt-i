import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'hoc/create-lang'
import { autobind } from 'core-decorators'
import { Table } from 'antd'
import moment from 'moment/moment'
import { SHAPE } from 'themes/color'
import { warningLevels, colorLevels } from 'constants/warningLevels'

@autobind
export default class TableDataList extends React.PureComponent {
  static propTypes = {
    measuringList: PropTypes.array,
    measuringData: PropTypes.array
  }

  getColumns() {
    let me = this
    const columnIndex = {
      title: '#',
      dataIndex: 'Index',
      key: 'Index',
      render(value, record, index) {
        const current = me.props.pagination.current
        const pageSize = me.props.pagination.pageSize
        return <div>{(current - 1) * pageSize + index + 1}</div>
      }
    }

    const columnReceivedAt = {
      title: translate('dataSearchFrom.dataTable.receivedAt'),
      dataIndex: 'receivedAt',
      key: 'receivedAt',
      render(value) {
        return <div>{moment(value).format('YYYY/MM/DD HH:mm')}</div>
      }
    }
    const columnsMeasurings = this.props.measuringData
      .filter(measuring => this.props.measuringList.includes(measuring.key))
      .map(measuring => ({
        title:
          `${measuring.name}` +
          (measuring.unit && measuring.unit !== ''
            ? `(${measuring.unit})`
            : ''),
        dataIndex: `measuringLogs.${measuring.key}`,
        key: measuring.key,
        render: value => {
          if (value === null) return <div />
          let color = SHAPE.BLACK
          if (
            value.warningLevel &&
            value.warningLevels !== warningLevels.GOOD
          ) {
            color = colorLevels[value.warningLevel]
          }
          // Format number toLocalString(national)
          return (
            <div style={{ color: color }}>
              {value.value.toLocaleString(navigator.language)}
            </div>
          )
        }
      }))
    return [columnIndex, columnReceivedAt, ...columnsMeasurings]
  }

  render() {
    return (
      <div>
        <Table
          size="small"
          rowKey="_id"
          columns={this.getColumns()}
          {...this.props}
          locale={{ emptyText: translate('dataSearchFrom.table.emptyText') }}
        />
      </div>
    )
  }
}
