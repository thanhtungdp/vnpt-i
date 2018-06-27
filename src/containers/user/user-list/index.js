import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Icon, Menu, Dropdown } from 'antd'
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
import moment from 'moment/moment'

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
const IconButton = styled(Icon)`
  padding-right: 5px;
  color: ${props => (props.color ? props.color : '#3E90F7')};
`

const Span = styled.span`
  color: ${props => (props.deleted ? '#999999' : '')};
  text-decoration: ${props => (props.deleted ? 'line-through' : '')};
`

@protectRole(ROLE.USER.VIEW)
@createManagerList({
  apiList: UserApi.searchUser
})
@createManagerDelete({
  apiDelete: UserApi.removeOne
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
        translate('userManager.list.confirmEnableAccount'),
        enable
          ? translate('userManager.list.enable')
          : translate('userManager.list.disable')
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

    let dropdown

    if (row.removeStatus && row.removeStatus.allowed)
      dropdown = this.getMenuIsDeleting(row, t, accountEnable)
    else dropdown = this.getMenuNotDeleting(row, t, accountEnable)

    return (
      <Dropdown overlay={dropdown} trigger={['click']}>
        <LinkSpan className="ant-dropdown-link">
          <Icon type="setting" style={{ fontSize: 20, color: '#3E90F7' }} />
        </LinkSpan>
      </Dropdown>
    )
  }

  getMenuNotDeleting(row, t, accountEnable) {
    return (
      <Menu>
        {protectRole(ROLE.USER.EDIT)(
          <Menu.Item key="0">
            <Link to={slug.user.editWithKey + '/' + row._id}>
              <IconButton type="edit" />
              {t('addon.edit')}
            </Link>
          </Menu.Item>
        )}
        {protectRole(ROLE.USER.DELETE)(
          <Menu.Item key="1">
            <a onClick={() => this.onDeleteItem(row._id, this.props.fetchData)}>
              <IconButton type="delete" color={'red'} />
              {t('addon.delete')}
            </a>
          </Menu.Item>
        )}
        {protectRole(ROLE.USER.ROLE)(
          <Menu.Item key="2">
            <Link to={slug.user.ruleWithKey + '/' + row._id}>
              <IconButton type="usergroup-add" />
              {t('userManager.list.roleAssign')}
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
              {accountEnable ? (
                <div>
                  {' '}
                  <IconButton type="user-delete" color="red" />
                  {t('userManager.list.disableAccount')}
                </div>
              ) : (
                <div>
                  {' '}
                  <IconButton type="user-add" />
                  {t('userManager.list.enableAccount')}
                </div>
              )}
            </a>
          </Menu.Item>
        )}
      </Menu>
    )
  }

  getMenuIsDeleting(row, t, accountEnable) {
    return protectRole(ROLE.USER.DELETE)(
      <Menu>
        <Menu.Item key="1">
          <a onClick={() => this.onRestoreItem(row._id, this.props.fetchData)}>
            <IconButton type="reload" />
            {t('addon.restore')}
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a
            onClick={() =>
              this.props.onDeleteItem(row._id, this.props.fetchData)
            }
          >
            <IconButton type="close-square-o" color={'red'} />
            {t('addon.remove')}
          </a>
        </Menu.Item>
      </Menu>
    )
  }

  getHead() {
    const { lang: { t } } = this.props
    return [
      { content: '#', width: 2 },
      { content: t('userManager.list.email'), width: 30 },
      { content: t('userManager.list.country'), width: 20 },
      { content: t('userManager.list.status'), width: 10 },
      { content: t('userManager.list.createdAt'), width: 15 },
      { content: t('userManager.list.action'), width: 10 },
      { content: t('userManager.list.login'), width: 15 }
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
                <AccountWapper>
                  <AvatarCharacter
                    size={32}
                    username={row.email}
                    avatarUrl={row.avatar}
                  />
                  <ClearFix width={4} />
                  <AccountInfo>
                    <Span
                      className={'email'}
                      deleted={row.removeStatus && row.removeStatus.allowed}
                    >
                      {row.email}
                    </Span>
                    <Span
                      className={'full-name '}
                      deleted={row.removeStatus && row.removeStatus.allowed}
                    >{`${row.lastName} ${row.firstName}`}</Span>
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
                  <Span deleted={row.removeStatus && row.removeStatus.allowed}>
                    {row.phone ? row.phone.name : ''}
                  </Span>
                </div>
              )}
          </div>
        )
      },
      {
        content: (
          <SpanEnable
            enable={
              row.accountStatus && row.accountStatus.enable === false
                ? false
                : true
            }
          >
            {row.accountStatus && row.accountStatus.enable === false
              ? 'Disable'
              : 'Enable'}
          </SpanEnable>
        )
      },
      {
        content: (
          <Span deleted={row.removeStatus && row.removeStatus.allowed}>
            {' '}
            {moment(row.createdAt).format('YYYY-MM-DD HH:mm')}
          </Span>
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

  async onDeleteItem(_id, callback) {
    const { lang: { t } } = this.props
    Modal.confirm({
      title: 'Do you want to delete these items?',
      onOk() {
        return new Promise(async (resolve, reject) => {
          const res = await UserApi.deleteOne(_id)
          if (res.success) {
            message.info(t('addon.onDelete.success'))
            callback()
          } else message.error(t('addon.onDelete.error'))
          resolve()
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel() {}
    })
  }

  async onRestoreItem(_id, callback) {
    const { lang: { t } } = this.props
    Modal.confirm({
      title: 'Do you want to restore these items?',
      onOk() {
        return new Promise(async (resolve, reject) => {
          const res = await UserApi.restoreOne(_id)
          if (res.success) {
            message.info(t('addon.onRestore.success'))
            callback()
          } else message.error(t('addon.onRestore.error'))
          resolve()
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel() {}
    })
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
