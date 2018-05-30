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
          return (
            <div>
              {moment(record.max.data.receivedAt).format('YYYY/MM/DD HH:mm')}
            </div>
          )
        }
      },
      {
        title: translate('dataSearchFrom.analyze.max'),
        dataIndex: 'Max',
        key: 'Max',
        render(value, record, index) {
          return <div>{record.max.data[0].value}</div>
        }
      },
      {
        title: translate('dataSearchFrom.analyze.minTime'),
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
        title: translate('dataSearchFrom.analyze.min'),
        dataIndex: 'Min',
        key: 'Min',
        render(value, record, index) {
          return <div>{record.min.data[0].value}</div>
        }
      },
      {
        title: translate('dataSearchFrom.analyze.avg'),
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
