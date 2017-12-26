import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from '@atlaskit/button'
import {Link} from 'react-router-dom'

import CategoriesApi from 'api/CategoriesApi'
import DynamicTable from 'components/elements/dynamic-table'
import Clearfix from 'components/elements/clearfix'
import LinkA from 'components/elements/link'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import createManagerListHoc from 'shared/hoc/manager-list'
import Icon from 'themes/icon'
import Slug from 'constants/slug'
import slug from "../../../constants/slug";



@createManagerListHoc({
  apiCall: CategoriesApi.getCategories,
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
    onDelete: PropTypes.func
  }


  getHead() {
    return [
      { content: 'Id', width: 10 },
      { content: 'Name' },
      { content: 'Type' },
      { content: 'Description' },
      { content: 'Child'}
    ]
  }

  getRows() {
    return this.props.data.map((row, index) => [
      {
        content: (
          <strong>
            {index + 1 }
          </strong>
        )
      },
      {
        content: (
          <div>
            <strong>{row.name}</strong><br />
          </div>
        )
      },
      {
        content:(
          <div>
            <span>{row.type}</span>
          </div>
        )
      },
      {
        content:(
          <div>
            <span>{row.description}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            {row.childMenu.map((child, index) => <span key={index}>
              {child.name} {index < row.childMenu.length - 1 ? ', ':null}
            </span>)}
          </div>
        )
      },
      {
        content: (
          <div>
            <Link to={slug.categories.editWithCode+row.code}>Edit</Link>
          </div>
        )
      },{
        content: (
          <div>
              <Button appearance="danger"  >Delete</Button>
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
          <LinkA to={Slug.categories.create}>
            <Button appearance="primary" iconBefore={Icon.categories}>
              Tạo mới bãi
            </Button>
          </LinkA>
        }
      >
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
