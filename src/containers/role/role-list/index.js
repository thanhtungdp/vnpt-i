import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Divider, Button, Icon, Form } from 'antd'
import RoleApi from 'api/RoleApi'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import DynamicTable from 'components/elements/dynamic-table'
import Breadcrumb from 'containers/manager/measuring/breadcrumb'

const FloatRight = styled.div`
  text-align: right;
`

@createManagerList({
  apiList: RoleApi.getRoles,
  itemPerPage: 2
})
@createManagerDelete({
  apiDelete: RoleApi.deleteRole
})
@createLanguageHoc
@autobind
export default class RoleList extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    onDeleteItem: PropTypes.func,
    fetchData: PropTypes.func,
    lang: langPropTypes
  }

  state = {
    isAdvanced: false
  }

  buttonAdd() {
    const { lang: { t } } = this.props
    return (
      <div>
        <Link to={slug.role.create}>
          <Button type="primary">
            <Icon type="plus" /> {t('addon.create')}
          </Button>
        </Link>
      </div>
    )
  }

  getHead() {
    return [
      { content: 'TT', width: 5 },
      { content: 'Name' },
      { content: 'Description' }
    ]
  }

  getRows() {
    return this.props.dataSource.map((row, index) => [
      {
        content: <strong>{index + 1}</strong>
      },
      {
        content: (
          <div>
            <strong>{row.name}</strong>
          </div>
        )
      },
      {
        content: (
          <div>
            <strong>{row.description}</strong>
          </div>
        )
      },
      {
        content: (
          <FloatRight>
            <Link to={slug.role.editWithKey + '/' + row._id}> Edit </Link>
            <Divider type="vertical" />
            <a
              onClick={() =>
                this.props.onDeleteItem(row._id, this.props.fetchData)
              }
            >
              Delete
            </a>
          </FloatRight>
        )
      }
    ])
  }

  render() {
    return (
      <PageContainer right={this.buttonAdd()}>
        <Breadcrumb items={['list']} />
        <DynamicTable
          rows={this.getRows()}
          head={this.getHead()}
          paginationOptions={{
            isSticky: 1
          }}
          onSetPage={this.props.onChangePage}
          pagination={this.props.pagination}
        />
      </PageContainer>
    )
  }
}
