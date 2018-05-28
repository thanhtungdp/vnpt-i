import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'hoc/create-lang'
import { autobind } from 'core-decorators'
import { Table } from 'antd'
import styled from 'styled-components'
import moment from 'moment/moment'
import { SHAPE } from 'themes/color'
import {} from 'hoc/create-lang'
import { warningLevels, colorLevels } from 'constants/warningLevels'
const TableDataListWrapper = styled.div``

@autobind
export default class TableDataList extends React.PureComponent {
  getColumns() {
    let me = this
    const columnIndex = {
      title: translate('dataSearchFrom.analize.parameters'),
      dataIndex: 'key',
      key: 'key',
      render(value, record, index) {
        return <div>{record.key}</div>
      }
    }
    let column = [
      columnIndex,
      {
        title: translate('dataSearchFrom.analize.maxTime'),
        dataIndex: 'MaxTime',
        key: 'MaxTime',
        render(value, record, index) {
          return (
            <div>
              {moment(record.max.data.receivedAt).format('YYYY/MM/DD HH:mm')}
            </div>
          )
        }
      },
      {
        title: translate('dataSearchFrom.analize.max'),
        dataIndex: 'Max',
        key: 'Max',
        render(value, record, index) {
          return <div>{record.max.data[0].value}</div>
        }
      },
      {
        title: translate('dataSearchFrom.analize.minTime'),
        dataIndex: 'MinTime',
        key: 'Min',
        render(value, record, index) {
          return (
            <div>
              {moment(record.min.data.receivedAt).format('YYYY/MM/DD HH:mm')}
            </div>
          )
        }
      },
      {
        title: translate('dataSearchFrom.analize.min'),
        dataIndex: 'Min',
        key: 'Min',
        render(value, record, index) {
          return <div>{record.min.data[0].value}</div>
        }
      },
      {
        title: translate('dataSearchFrom.analize.avg'),
        dataIndex: 'Avg',
        key: 'Avg',
        render(value, record, index) {
          return <div>{Math.round(record.avg.data[0].value, 2)}</div>
        }
      }
    ]

    return column
  }

  render() {
    return (
      <Table
        size="small"
        rowKey="key"
        columns={this.getColumns()}
        dataSource={this.props.dataAnalizeStationAuto}
        pagination={false}
        locale={{ emptyText: translate('dataSearchFrom.table.emptyText') }}
      />
    )
  }
}
