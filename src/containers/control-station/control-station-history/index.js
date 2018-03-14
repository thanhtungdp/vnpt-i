import React, { PureComponent } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import { autobind } from 'core-decorators'

const columns = [
  {
    title: 'Order By Bottle',
    dataIndex: 'LayMauChai',
    width: 150,
    fixed: 'left'
  },
  {
    title: 'DateTime',
    dataIndex: 'ThoiGian',
    width: 150
  },
  {
    title: 'Content',
    dataIndex: 'NoiDung'
  },
  {
    title: 'UserName',
    dataIndex: 'Username'
  }
]

@autobind
export default class ControlStationHistory extends PureComponent {
  static propTypes = {
    datasource: PropTypes.any
  }

  filterData() {
    if (this.props.datasource.length === 0) return
    return this.props.datasource.map(item => ({
      ...item,
      ThoiGian:
        item.ThoiGian != null
          ? moment(item.ThoiGian).format('DD/MM/YYYY HH:mm:ss')
          : ''
    }))
  }

  render() {
    return (
      <div style={{ width: '100%', display: 'block' }}>
        <Table
          columns={columns}
          dataSource={this.filterData()}
          bordered
          size={'small'}
        />
      </div>
    )
  }
}
