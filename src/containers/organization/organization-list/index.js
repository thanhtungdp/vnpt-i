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
import Breadcrumb from '../breadcrumb'

@createManagerListHoc({
  apiCall: OrganizationApi.getOrganizations,
  apiDelete: OrganizationApi.deleteOrganization,
  itemPerPage: 10
})
@autobind
export default class OrganizationlList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.object,
    isLoading: PropTypes.bool,
    onChangePage: PropTypes.func,
    onDeleteItem: PropTypes.func,
    getIndexByPagination: PropTypes.func
  }

  getHead() {
    return [
      { content: 'TT', width: 10 },
      { content: 'Tên' },
      { content: 'Giám đốc' },
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
            <span>{row.director}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <LinkCustom to={Slug.organization.editWithId + `${row._id}`}>
              Chỉnh sửa
            </LinkCustom>
            &nbsp;&nbsp;
            <LinkA
              colorType="red"
              onClick={e =>
                this.props.onDeleteItem(
                  e,
                  row.name,
                  item => row._id === item._id,
                  row._id
                )
              }
            >
              Xóa
            </LinkA>
          </div>
        )
      }
    ])
  }

  render() {
    return (
      <PageContainer
        right={
          <LinkCustom to={Slug.organization.create}>
            <Button iconBefore={Icon.create}>Tạo mới</Button>
          </LinkCustom>
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
