import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import CategoryApi from 'api/CategoryApi'
import DynamicTable from 'components/elements/dynamic-table/index'
import Clearfix from 'components/elements/clearfix/index'
import LinkA from 'components/elements/link/index'
import LinkColor from 'components/elements/link-a/index'
import Button from '@atlaskit/button'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import createManagerListHoc from 'shared/hoc/manager-list/index'
import slug from 'constants/slug'
import Icon from 'themes/icon'
import Breadcrumb from '../breadcrumb'

@createManagerListHoc({
  apiCall: CategoryApi.getCategories,
  apiDelete: CategoryApi.deleteCategory,
  itemPerPage: 10
})
@autobind
export default class CategoriesList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.object,
    isLoading: PropTypes.bool,
    onChangePage: PropTypes.func,
    getIndexByPagination: PropTypes.func,
    onDeleteItem: PropTypes.func
  }

  getHead() {
    return [
      { content: 'TT', width: 10 },
      { content: 'Tên' },
      { content: 'Loại' },
      { content: 'Chuyên mục con' },
      { content: 'Hành động' }
    ]
  }

  getRows() {
    return this.props.data.map((row, index) => [
      {
        content: <strong>{index + 1}</strong>
      },
      {
        content: (
          <div>
            <strong>{row.name}</strong>
            <br />
          </div>
        )
      },
      {
        content: (
          <div>
            <span>{row.type}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            {row.childMenu.map((child, index) => (
              <span key={index}>
                {child.name} {index < row.childMenu.length - 1 ? ', ' : null}
              </span>
            ))}
          </div>
        )
      },
      {
        content: (
          <div>
            <LinkA to={slug.category.editWithCode + row._id}>Chỉnh sửa</LinkA>
            &nbsp;&nbsp;&nbsp;
            <LinkColor
              colorType="red"
              onClick={e =>
                this.props.onDeleteItem(
                  e,
                  row.name,
                  item => item._id === row._id,
                  row._id
                )
              }
            >
              Xóa
            </LinkColor>
          </div>
        )
      }
    ])
  }

  render() {
    return (
      <PageContainer
        title="Danh sách chuyên mục"
        right={
          <LinkA to={slug.category.create}>
            <Button iconBefore={Icon.category} appearance="primary">
              Tạo mới
            </Button>
          </LinkA>
        }
      >
        <Breadcrumb items={['list']} />
        <DynamicTable
          isFixedSize
          head={this.getHead()}
          rows={this.getRows()}
          pagination={this.props.pagination}
          onSetPage={this.props.onChangePage}
          isLoading={this.props.isLoading}
        />
        <Clearfix height={64} />
      </PageContainer>
    )
  }
}
