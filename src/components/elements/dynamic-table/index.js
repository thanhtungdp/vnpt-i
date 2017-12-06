import React, { PureComponent } from 'react'
import styled from 'styled-components'
import DynamicTable from '@atlaskit/dynamic-table'

const WrapperHeader = styled.div`
  padding: 8px 0px;
  font-size: 14px;
`

const WrapperTdBody = styled.div`
  padding: 8px 0px;
`

export default class DynamicTableCustom extends PureComponent {
  renderHead() {
    return {
      cells: this.props.head.map(cell => ({
        ...cell,
        content: typeof cell.content === 'string'
          ? <WrapperHeader>{cell.content}</WrapperHeader>
          : cell.content
      }))
    }
  }

  renderRows() {
    const rows = this.props.rows.map(row => ({
      cells: row.map(cell => ({
        ...cell,
        content: typeof cell.content === 'string'
          ? <WrapperTdBody>{cell.content}</WrapperTdBody>
          : cell.content
      }))
    }))
    const fakeRows = this.getArrayFromNumber(
      this.props.totalItem
    ).map(number => ({
      cells: this.getArrayFromNumber(this.props.head.length).map(n => ({
        key: n,
        content: ''
      }))
    }))
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
      <DynamicTable
        {...this.props}
        head={this.renderHead()}
        rows={this.renderRows()}
      />
    )
  }
}
