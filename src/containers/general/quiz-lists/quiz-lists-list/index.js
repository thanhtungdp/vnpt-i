import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from '@atlaskit/button'
import LinkA from 'components/elements/link-a/index'
import QuizListApi from 'api/QuizListApi'
import DynamicTable from 'components/elements/dynamic-table/index'
import Clearfix from 'components/elements/clearfix/index'
import LinkCustom from 'components/elements/link/index'
import UserAvatar from 'components/elements/user-avatar'
import QuizListStatusSelect from 'components/quiz-list/quiz-list-status-select'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import createManagerListHoc from 'shared/hoc/manager-list/index'
import Icon from 'themes/icon'
import { cleanQuizLists } from 'utils/clean'
import swal from 'sweetalert2'
import styled from 'styled-components'
import { SHAPE } from 'themes/color'
import quizListStatusType from 'constants/quizListStatusType'
import Breadcrumb from '../breadcrumb'

function getColorStatusType(status) {
  switch (status) {
    case quizListStatusType.NEW:
      return SHAPE.GREEN
    case quizListStatusType.REJECTED:
      return SHAPE.RED
    case quizListStatusType.OLD:
      return SHAPE.GRAYTEXT
    case quizListStatusType.NEED_REVIEW:
      return SHAPE.PRIMARY
    default:
      return
  }
}

const IndexValidate = styled.span`
  font-weight: 600;
  color: ${props => getColorStatusType(props.status)};
`

@createManagerListHoc({
  apiCall: QuizListApi.getQuizLists,
  cleanData: cleanQuizLists,
  keyData: 'data',
  itemPerPage: 20
})
@autobind
export default class QuizListsList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.object,
    isLoading: PropTypes.bool,
    onChangePage: PropTypes.func,
    onRefresh: PropTypes.func,
    getIndexByPagination: PropTypes.func
  }

  handleChangeStatus(quizListId, statusType) {
    QuizListApi.updateStatusType(quizListId, statusType.value).then(() => {
      this.props.onRefresh()
    })
    swal({
      type: 'success',
      value: 'Cập nhật thành công',
      text: statusType.content
    })
  }

  getHead() {
    return [
      { content: 'TT', width: 2 },
      { content: 'Tên đề thi', width: 30 },
      { content: 'Tác giả', width: 10 },
      { content: 'Status', width: 10 }
    ]
  }

  getRows() {
    return this.props.data.map((row, index) => [
      {
        content: (
          <div>
            <IndexValidate status={row.statusType}>
              {(this.props.pagination.page - 1) *
                this.props.pagination.itemPerPage +
                index +
                1}
            </IndexValidate>
          </div>
        )
      },
      {
        content: (
          <div>
            <LinkA
              color={getColorStatusType(row.statusType)}
              target="_blank"
              href={`https://tungtung.vn/de-thi/${row.slug}.view`}
            >
              {row.name}
            </LinkA>
          </div>
        )
      },
      {
        content: (
          <div>
            {row.user &&
              row.user.username && (
                <UserAvatar {...row.user} isLink avatarSize={25} />
              )}
          </div>
        )
      },
      {
        content: (
          <div>
            <QuizListStatusSelect
              value={row.statusType}
              onChange={status => this.handleChangeStatus(row._id, status)}
            />
          </div>
        )
      }
    ])
  }

  render() {
    return (
      <PageContainer
        title="Danh sách đề thi"
        right={
          <LinkCustom target="_blank" to="https://tungtung.vn/tao-de-thi/info">
            <Button appearance="primary" iconBefore={Icon.create}>
              Tạo mới
            </Button>
          </LinkCustom>
        }
      >
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
