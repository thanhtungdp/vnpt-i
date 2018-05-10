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
import AvatarCharacter from 'components/elements/avatar-character'
import ClearFix from 'components/elements/clearfix'
import styled from 'styled-components'
import TimeAgo from 'react-timeago'

const AccountWapper = styled.div`
  display: flex;
  align-items: center;
`
const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  .email {
    color: #000;
    font-weight: bold;
  }
  .full-name {
    color: #707070;
  }
`
const SpanTimeAgo = styled.div`
  font-size: 13px;
  color: #707070;
`

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
    const { lang: { t } } = this.props
    return (
      <div>
        {protectRole(ROLE.USER.CREATE)(
          <Link to={slug.user.create}>
            <Button type="primary">
              <Icon type="plus" />
              {t('addon.create')}
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
      { content: t('userSearchFrom.form.email.label'), width: 30 },
      { content: t('userSearchFrom.form.country.label'), width: 20 },
      { content: t('userSearchFrom.form.action'), width: 20 },
      { content: t('login.title'), width: 10 }
    ]
  }

  getRows() {
    const { lang: { t } } = this.props
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
                <AccountWapper>
                  <AvatarCharacter
                    size={32}
                    username={row.email}
                    avatarUrl={row.avatar}
                  />
                  <ClearFix width={4} />
                  <AccountInfo>
                    <span className={'email'}>{row.email}</span>
                    <span className={'full-name '}>{`${row.lastName} ${
                      row.firstName
                    }`}</span>
                  </AccountInfo>
                </AccountWapper>
              )}
          </div>
        )
      },
      {
        content: (
          <div>
            {row.phone &&
              row.phone.iso2 && (
                <div style={{ display: 'flex' }}>
                  <ReactCountryFlag code={row.phone.iso2} />
                  {row.phone ? row.phone.name : ''}
                </div>
              )}
          </div>
        )
      },
      {
        content: (
          <span>
            {protectRole(ROLE.USER.EDIT)(
              <Link to={slug.user.editWithKey + '/' + row._id}>
                {' '}
                {t('addon.edit')}{' '}
              </Link>
            )}
            <Divider type="vertical" />
            {protectRole(ROLE.USER.DELETE)(
              <a
                onClick={() =>
                  this.props.onDeleteItem(row._id, this.props.fetchData)
                }
              >
                {t('addon.delete')}
              </a>
            )}
            <Divider type="vertical" />
            {protectRole(ROLE.USER.ROLE)(
              <Link to={slug.user.ruleWithKey + '/' + row._id}>
                {' '}
                {t('userRule.role.label')}{' '}
              </Link>
            )}
          </span>
        )
      },
      {
        content: (
          <SpanTimeAgo>
            <TimeAgo date={row.lastLoginAt} />
          </SpanTimeAgo>
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
