import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DynamicTable from '@atlaskit/dynamic-table'

const WrapperHeader = styled.div`
  padding: 8px 0px;
  font-size: 14px;
`

const WrapperTdBody = styled.div`
  padding: 8px 0px;
`

export default class DynamicTableCustom extends PureComponent {
  static propTypes = {
    pagination: PropTypes.shape({
      itemPerPage: PropTypes.number,
      page: PropTypes.number
    })
  }

  renderHead() {
    return {
      cells: this.props.head.map(cell => ({
        ...cell,
        content:
          typeof cell.content === 'string' ? (
            <WrapperHeader>{cell.content}</WrapperHeader>
          ) : (
            cell.content
          )
      }))
    }
  }

  renderRows() {
    const rows = this.props.rows.map(row => ({
      cells: row.map(cell => ({
        ...cell,
        content: <WrapperTdBody>{cell.content}</WrapperTdBody>
      }))
    }))
    let fakeRows = []
    if (this.props.pagination.totalItem > rows.length) {
      fakeRows = this.getArrayFromNumber(
        this.props.pagination.totalItem - this.props.rows.length
      ).map(number => ({
        cells: this.getArrayFromNumber(this.props.head.length).map(n => ({
          key: n,
          content: ''
        }))
      }))
    }
    return [...rows, ...fakeRows]
  }

  getArrayFromNumber(number) {
    let array = []
    for (let i = 0; i < number; i++) {
      array.push(i)
    }
    return array
  }

  render() {
    return (
      <div>
        <DynamicTable
          {...this.props}
          rowsPerPage={this.props.pagination.itemPerPage}
          page={this.props.pagination.page}
          head={this.renderHead()}
          rows={this.renderRows()}
          ref={ref => (this.table = ref)}
        />
      </div>
    )
  }
}
