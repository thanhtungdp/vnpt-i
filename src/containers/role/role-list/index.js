import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Divider, Button, Icon } from 'antd'
import RoleApi from 'api/RoleApi'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import DynamicTable from 'components/elements/dynamic-table'
import Breadcrumb from 'containers/role/breadcrumb'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

const FloatRight = styled.div`
  text-align: right;
`

@protectRole(ROLE.ROLE.VIEW)
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
        {protectRole(ROLE.ROLE.CREATE)(
          <Link to={slug.role.create}>
            <Button type="primary">
              <Icon type="plus" /> {t('addon.create')}
            </Button>
          </Link>
        )}
      </div>
    )
  }

  getHead() {
    const { lang: { t } } = this.props
    return [
      { content: '#', width: 5 },
      { content: t('Role.form.name.label') },
      { content: t('Role.form.description.label') }
    ]
  }

  getRows() {
    const { lang: { t } } = this.props
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
            {protectRole(ROLE.ROLE.EDIT)(
              <Link to={slug.role.editWithKey + '/' + row._id}> {t('addon.edit')} </Link>
            )}
            <Divider type="vertical" />
            {protectRole(ROLE.ROLE.DELETE)(
              <a
                onClick={() =>
                  this.props.onDeleteItem(row._id, this.props.fetchData)
                }
              >
                {t('addon.delete')}
              </a>
            )}
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
