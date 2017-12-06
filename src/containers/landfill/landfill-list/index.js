import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import DynamicTable from 'components/elements/dynamic-table'

const data = [
  {
    _id: 1,
    name: 'Tung',
    code: '123456',
    description: 'Good'
  },
  {
    _id: 1,
    name: 'Tung',
    code: '1234567',
    description: 'Good'
  },
  {
    _id: 1,
    name: 'Tung',
    code: '1234568',
    description: 'Good'
  },
  {
    _id: 1,
    name: 'Tung2',
    code: '123456',
    description: 'Good'
  }
]

const head = [
  {
    key: '_id',
    content: 'Id',
    width: 20
  },
  { key: 'code', content: 'Code', width: 100 }
]

const rows = data.map(d => [
  {
    key: '_id',
    content: d._id
  },
  {
    key: 'code',
    content: d.code
  }
])

export default class LandfillList extends PureComponent {
  static propTypes = {}
  handleChangePage(page){
    console.log(page)
  }
  render() {
    return (
      <PageContainer title="Danh sách bãi">
        <DynamicTable
          head={head}
          rows={rows}
          rowsPerPage={10}
          totalItem={100}
          onSetPage={this.handleChangePage}
        />
      </PageContainer>
    )
  }
}
