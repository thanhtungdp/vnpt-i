import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { Table } from 'antd'
import styled from 'styled-components'
import moment from 'moment/moment'
import roundTo from 'round-to'

const TableDataListWrapper = styled.div``

@autobind
export default class TableDataList extends React.PureComponent {
  static propTypes = {
    measuringList: PropTypes.array
  }

  getColumns() {
    const columnReceivedAt = {
      title: 'Received At',
      dataIndex: 'receivedAt',
      key: 'receivedAt',
      render(value) {
        return <div>{moment(value).toString()}</div>
      }
    }
    const columnsMeasurings = this.props.measuringList.map(measuring => ({
      title: `${measuring.name}(${measuring.unit})`,
      dataIndex: `${measuring.key}`,
      key: measuring.key,
      render: value => <div>{value && value !== '' && roundTo(value, 2)}</div>
    }))
    return [columnReceivedAt, ...columnsMeasurings]
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
