import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { Table } from 'antd'
import styled from 'styled-components'
import moment from 'moment/moment'
import roundTo from 'round-to'
import { translate } from 'hoc/create-lang'

const TableDataListWrapper = styled.div``

@autobind
export default class TableDataList extends React.PureComponent {
  static propTypes = {
    measuringList: PropTypes.array,
    measuringData: PropTypes.array
  }

  getColumns() {
    const columnReceivedAt = {
      title: 'Received At',
      dataIndex: 'receivedAt',
      key: 'receivedAt',
      render(value, record) {
        return (
          <div>
            {moment(record._id).format('DD/MM/YYYY HH:mm')}
            {/* {moment(record._id).format('dddd, MMMM Do YYYY, h:mm:ss a')} */}
          </div>
        )
      }
    }
    const columnsMeasurings = this.props.measuringData
      .filter(measuring => this.props.measuringList.includes(measuring.key))
      .map(measuring => ({
        title: `${measuring.name}(${measuring.unit})`,
        dataIndex: `${measuring.key}`,
        key: measuring.key,
        // format number to LocaleString(language bowser)
        render: value => (
          <div>
            {value.toLocaleString(navigator.language) &&
              value.toLocaleString(navigator.language) !== '' &&
              roundTo(value, 2).toLocaleString(navigator.language)}
          </div>
        )
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
          locale={{ emptyText: translate('avgSearchFrom.table.emptyText') }}
        />
      </TableDataListWrapper>
    )
  }
}
