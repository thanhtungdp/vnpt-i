import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import LinkA from 'components/elements/link-a/index'
import DynamicTable from 'components/elements/dynamic-table/index'
import Clearfix from 'components/elements/clearfix/index'
import UserApi from 'api/UserApi'
import UserAvatar from 'components/elements/user-avatar'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import createManagerListHoc from 'shared/hoc/manager-list/index'
import Tooltip from '@atlaskit/tooltip'
import moment from 'moment'
import { cleanUsers } from 'utils/clean'
import Breadcrumb from '../breadcrumb'

@createManagerListHoc({
  apiCall: UserApi.getUsers,
  cleanData: cleanUsers,
  keyData: 'data',
  itemPerPage: 50
})
@autobind
export default class CarList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.object,
    isLoading: PropTypes.bool,
    onChangePage: PropTypes.func,
    getIndexByPagination: PropTypes.func
  }

  getHead() {
    return [
      { content: 'TT', width: 5 },
      { content: 'Thành viên' },
      { content: 'Email' },
      { content: 'Đăng nhập từ' }
    ]
  }

  getRows() {
    return this.props.data.map((user, index) => [
      {
        content: (
          <div>
            <span>
              {(this.props.pagination.page - 1) *
                this.props.pagination.itemPerPage +
                index +
                1}
            </span>
          </div>
        )
      },
      {
        content: (
          <div>
            <UserAvatar {...user} isLink avatarSize={25} />
          </div>
        )
      },
      {
        content: <div>{user.email}</div>
      },
      {
        content: (
          <div>
            {user.facebookID ? (
              <LinkA
                target="_blank"
                href={`https://facebook.com/${user.facebookID}`}
              >
                Facebook
              </LinkA>
            ) : (
              'On site'
            )}
          </div>
        )
      },
      {
        content: (
          <div>
            <Tooltip content={moment(user.created_at).format('D/m/Y HH:mm')}>
              <span>{moment(user.created_at).fromNow()}</span>
            </Tooltip>
          </div>
        )
      }
    ])
  }

  render() {
    return (
      <PageContainer title="Danh sách thành viên">
        <Breadcrumb items={['list']} />
        <DynamicTable
          isFixedSize
          head={this.getHead()}
          rows={this.getRows()}
          pagination={this.props.pagination}
          paginationOptions={{
            isSticky: true
          }}
          onSetPage={this.props.onChangePage}
          isLoading={this.props.isLoading}
        />
        <Clearfix height={64} />
      </PageContainer>
    )
  }
}
