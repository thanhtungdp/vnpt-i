import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Divider, Button, Icon, Menu, Dropdown } from 'antd'
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
import { Modal, message } from 'antd'
import format from 'string-format'
import { translate } from 'hoc/create-lang'

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
const LinkSpan = styled.span`
  color: #000;
  &:hover {
    cursor: pointer;
  }
`
const SpanEnable = styled.span`
  color: #fff;
  background-color: ${props => (props.enable ? '#1890ff' : '#9CABB3')};
  border-radius: 5px;
  padding: 1px 5px;
  font-size: 12px;
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

  async onEnableAccount(_id, enable, callback) {
    Modal.confirm({
      title: format(
        translate('userForm.list.confirmEnableAccount'),
        enable
          ? translate('userForm.list.enable')
          : translate('userForm.list.disable')
      ),
      onOk() {
        return new Promise(async (resolve, reject) => {
          const data = await UserApi.accountEnable(_id, { enable })
          if (data.success) {
            callback()
          } else {
            message.error(data.message)
          }
          resolve()
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel() {}
    })
  }

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

  actionGroup(row) {
    const { lang: { t } } = this.props
    let accountEnable = true
    if (row.accountStatus && row.accountStatus.enable === false) {
      accountEnable = false
    }
    const dropdown = (
      <Menu>
        {protectRole(ROLE.USER.EDIT)(
          <Menu.Item key="0">
            <Link to={slug.user.editWithKey + '/' + row._id}>
              {t('addon.edit')}
            </Link>
          </Menu.Item>
        )}
        {protectRole(ROLE.USER.DELETE)(
          <Menu.Item key="1">
            <a
              onClick={() =>
                this.props.onDeleteItem(row._id, this.props.fetchData)
              }
            >
              {t('addon.delete')}
            </a>
          </Menu.Item>
        )}
        {protectRole(ROLE.USER.ROLE)(
          <Menu.Item key="2">
            <Link to={slug.user.ruleWithKey + '/' + row._id}>
              {t('userRule.role.label')}
            </Link>
          </Menu.Item>
        )}
        {protectRole(ROLE.USER.ENABLE_ACCOUNT)(
          <Menu.Item key="3">
            <a
              onClick={() =>
                this.onEnableAccount(
                  row._id,
                  !accountEnable,
                  this.props.fetchData
                )
              }
            >
              {accountEnable
                ? t('userForm.list.disableAccount')
                : t('userForm.list.enableAccount')}
            </a>
          </Menu.Item>
        )}
      </Menu>
    )
    return (
      <Dropdown overlay={dropdown} trigger={['click']}>
        <LinkSpan className="ant-dropdown-link">
          <Icon
            type="down-square-o"
            style={{ fontSize: 20, color: '#3E90F7' }}
          />
        </LinkSpan>
      </Dropdown>
    )
  }

  getHead() {
    const { lang: { t } } = this.props
    return [
      { content: '#', width: 2 },
      { content: t('userSearchFrom.form.email.label'), width: 30 },
      { content: t('userSearchFrom.form.country.label'), width: 20 },
      { content: 'Status', width: 10 },
      { content: 'Action', width: 20 },
      { content: 'Login', width: 10 }
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
          <SpanEnable
            enable={
              row.accountStatus && row.accountStatus.enable == false
                ? false
                : true
            }
          >
            {row.accountStatus && row.accountStatus.enable == false
              ? 'Disable'
              : 'Enable'}
          </SpanEnable>
        )
      },
      {
        content: <span>{this.actionGroup(row)}</span>
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
