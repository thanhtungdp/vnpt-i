import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from '@atlaskit/button'
import LinkA from 'components/elements/link-a'
import OrganizationApi from 'api/OrganizationApi'
import DynamicTable from 'components/elements/dynamic-table'
import Clearfix from 'components/elements/clearfix'
import LinkCustom from 'components/elements/link'
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

  deleteItem(_id) {
    console.log(_id)
  }

  getHead() {
    return [
      { content: 'Id', width: 10 },
      { content: 'Name' },
      { content: 'Description' },
      { content: 'Director' },
      { content: 'Actions' }
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
            <LinkCustom to={Slug.organization.editWithId + `${row._id}`}>Edit</LinkCustom>
            &nbsp;&nbsp;
            <LinkA colorType="red" onClick={this.deleteItem(row._id)}>
              Delete
            </LinkA>
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
          <LinkCustom to={Slug.organization.create}>
            <Button appearance="primary" iconBefore={Icon.create}>
              Tạo mới
            </Button>
          </LinkCustom>
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
