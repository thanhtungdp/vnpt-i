import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Divider, Button, Icon } from 'antd'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import Breadcrumb from '../breadcrumb'
import UserSearchForm from '../user-search-form'
import createLanguageHoc, { langPropTypes } from '../../../hoc/create-lang'
import UserApi from 'api/UserApi'
import ReactCountryFlag from 'react-country-flag'
import DynamicTable from 'components/elements/dynamic-table'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

@protectRole(ROLE.USER.VIEW)
@createManagerList({
  apiList: UserApi.searchUser
})
@createManagerDelete({
  apiDelete: UserApi.deleteOne
})
@createLanguageHoc
@autobind
export default class UserList extends React.Component {
  static propTypes = {
    pagination: PropTypes.object,
    pathImg: PropTypes.string,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    onDeleteItem: PropTypes.func,
    fetchData: PropTypes.func,
    lang: langPropTypes
  }

  async componentWillMount() {}

  buttonAdd() {
    return (
      <div>
        {protectRole('', [ROLE.USER.CREATE], 'item')(
          <Link to={slug.user.create}>
            <Button type="primary">
              <Icon type="plus" />Create
            </Button>
          </Link>
        )}
      </div>
    )
  }

  renderSearchForm() {
    return (
      <UserSearchForm
        onChangeSearch={query => {
          this.props.onChangeSearch(query)
        }}
        initialValues={this.props.data}
      />
    )
  }

  getHead() {
    const { lang: { t } } = this.props
    return [
      { content: '#', width: 2 },
      { content: t('userSearchFrom.form.email.label'), width: 20 },
      { content: t('userSearchFrom.form.organization.label'), width: 30 },
      { content: 'Action', width: 10 }
    ]
  }

  getRows() {
    return this.props.dataSource.map((row, index) => [
      {
        content: (
          <strong>
            {(this.props.pagination.page - 1) *
              this.props.pagination.itemPerPage +
              index +
              1}
          </strong>
        )
      },
      {
        content: (
          <div>
            {row.phone &&
              row.phone.iso2 && (
                <span style={{ fontSize: 20 }}>
                  {' '}
                  <ReactCountryFlag code={row.phone.iso2} />
                </span>
              )}
            <span>{row.email}</span>
          </div>
        )
      },
      {
        content: row.organization ? row.organization.name : ''
      },
      {
        content: (
          <span>
            {protectRole('', [ROLE.USER.EDIT], 'item')(
              <Link to={slug.user.editWithKey + '/' + row._id}> Edit </Link>
            )}
            <Divider type="vertical" />
            {protectRole('', [ROLE.USER.DELETE], 'item')(
              <a
                onClick={() =>
                  this.props.onDeleteItem(row._id, this.props.fetchData)
                }
              >
                Delete
              </a>
            )}
            <Divider type="vertical" />
            {protectRole('', [ROLE.USER.ROLE], 'item')(
              <Link to={slug.user.ruleWithKey + '/' + row._id}> Role </Link>
            )}
          </span>
        )
      }
    ])
  }

  render() {
    return (
      <PageContainer center={this.renderSearchForm()} right={this.buttonAdd()}>
        <Breadcrumb items={['list']} />
        <DynamicTable
          loading={this.props.isLoading}
          rows={this.getRows()}
          head={this.getHead()}
          paginationOptions={{
            isSticky: true
          }}
          onSetPage={this.props.onChangePage}
          pagination={this.props.pagination}
        />
      </PageContainer>
    )
  }
}
