import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { Table } from 'antd'
import styled from 'styled-components'
import moment from 'moment/moment'
import { SHAPE } from 'themes/color'

const TableDataListWrapper = styled.div``

const CONFIG = {
  multiplicationTime: 1,
  prepareExceeded: 0.9
}

@autobind
export default class TableDataList extends React.PureComponent {
  static propTypes = {
    measuringList: PropTypes.array,
    measuringData: PropTypes.array
  }

  getColumns() {
    var me = this
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
      title: 'Received At',
      dataIndex: 'receivedAt',
      key: 'receivedAt',
      render(value) {
        return <div>{moment(value).format('DD/MM/YYYY HH:mm')}</div>
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
          if (value == null) return <div />
          var color = SHAPE.BLACK
          if (value.value >= value.maxLimit * CONFIG.prepareExceeded) {
            color = SHAPE.ORANGE
          } else if (
            value.value <= value.minLimit ||
            value.value >= value.maxLimit * CONFIG.multiplicationTime
          ) {
            color = SHAPE.RED
          }
          // Format number toLocalString(national)
          return (
            <div style={{ color: color }}>
              {value.value.toLocaleString(navigator.language)}
            </div>
          )
          //  return <div style={{ color: color }}>{value.value}</div>
        }
      }))
    return [columnIndex, columnReceivedAt, ...columnsMeasurings]
  }

  render() {
    return (
      <TableDataListWrapper>
        <Table
          size="large"
          rowKey="_id"
          columns={this.getColumns()}
          {...this.props}
        />
      </TableDataListWrapper>
    )
  }
}
