import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from '@atlaskit/button'
import {Link} from 'react-router-dom'

import OrganizationApi from 'api/OrganizationApi'
import DynamicTable from 'components/elements/dynamic-table'
import Clearfix from 'components/elements/clearfix'
import LinkA from 'components/elements/link'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import createManagerListHoc from 'shared/hoc/manager-list'
import Icon from 'themes/icon'
import Slug from 'constants/slug'

@createManagerListHoc({
  apiCall: OrganizationApi.getOrganizations,
  itemPerPage: 10
})
@autobind
export default class OrganizationlList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.object,
    isLoading: PropTypes.bool,
    onChangePage: PropTypes.func,
    getIndexByPagination: PropTypes.func
  }

  deleteItem(_id){
    console.log(_id)
  }

  getHead() {
    return [
      { content: 'Id', width: 10 },
      { content: 'Name' },
      { content: 'Description' },
      { content: 'Director' }
    ]
  }

  getRows() {
    return this.props.data.map((row, index) => [
      {
        content: (
          <strong>
            {index + 1}
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
        content: (
          <div>
            <span>{row.description}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <span>{row.director}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <Link to={Slug.organization.editWithId+`${row._id}`}>Chinh sua</Link>
          </div>
        )
      },
      {
        content: (
          <div>
            <Button appearance="danger" onClick={this.deleteItem(row._id)}>Xoa</Button>
          </div>
        )
      }
    ])
  }

  render() {
    return (
      <PageContainer
        title="Danh sách Doanh Nghiệp"
        right={
          <LinkA to={Slug.organization.create}>
            <Button appearance="primary" iconBefore={Icon.direction}>
              Tạo mới doanh nghiệp
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
