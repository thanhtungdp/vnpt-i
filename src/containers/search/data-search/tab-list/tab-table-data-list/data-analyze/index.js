import React from 'react'
import { translate } from 'hoc/create-lang'
import { autobind } from 'core-decorators'
import { Table } from 'antd'
import moment from 'moment/moment'
import BoxShadow from 'components/elements/box-shadow/index'

const TabeListWrapper = BoxShadow.extend`
  padding: 16px 16px 16px 16px;
  position: relative;
`

@autobind
export default class TableDataList extends React.PureComponent {
  getColumns() {
    const columnIndex = {
      title: translate('dataSearchFrom.analyze.parameters'),
      dataIndex: 'key',
      key: 'key',
      render(value, record, index) {
        return <div>{record.key}</div>
      }
    }
    let column = [
      columnIndex,
      {
        title: translate('dataSearchFrom.analyze.maxTime'),
        dataIndex: 'MaxTime',
        key: 'MaxTime',
        render(value, record, index) {
          let val =
            record.max.data.length > 0
              ? record.max.data[0].receivedAt || ''
              : ''
          if (val) val = moment(val).format('YYYY/MM/DD HH:mm')
          return <div>{val}</div>
        }
      },
      {
        title: translate('dataSearchFrom.analyze.max'),
        dataIndex: 'Max',
        key: 'Max',
        render(value, record, index) {
          let val =
            record.max.data.length > 0 ? record.max.data[0].value || '' : ''
          return <div>{val}</div>
        }
      },
      {
        title: translate('dataSearchFrom.analyze.minTime'),
        dataIndex: 'MinTime',
        key: 'Min',
        render(value, record, index) {
          let val =
            record.min.data.length > 0
              ? record.min.data[0].receivedAt || ''
              : ''
          if (val) val = moment(val).format('YYYY/MM/DD HH:mm')
          return <div>{val}</div>
        }
      },
      {
        title: translate('dataSearchFrom.analyze.min'),
        dataIndex: 'Min',
        key: 'Min',
        render(value, record, index) {
          let val =
            record.min.data.length > 0 ? record.min.data[0].value || '' : ''
          return <div>{val}</div>
        }
      },
      {
        title: translate('dataSearchFrom.analyze.avg'),
        dataIndex: 'Avg',
        key: 'Avg',
        render(value, record, index) {
          let val =
            record.avg.data.length > 0 ? record.avg.data[0].value || '' : ''
          if (val) val = Math.round(val, 2)
          return <div>{val}</div>
        }
      }
    ]

    return column
  }

  render() {
    return (
      <TabeListWrapper>
        <Table
          size="small"
          rowKey="key"
          columns={this.getColumns()}
          dataSource={this.props.dataAnalyzeStationAuto}
          pagination={false}
          locale={{ emptyText: translate('dataSearchFrom.table.emptyText') }}
        />
      </TabeListWrapper>
    )
  }
}
