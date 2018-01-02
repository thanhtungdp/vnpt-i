import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from '@atlaskit/button'

import StationApi from 'api/StationApi'
import DynamicTable from 'components/elements/dynamic-table'
import Clearfix from 'components/elements/clearfix'
import LinkA from 'components/elements/link'
import LinkColor from 'components/elements/link-a'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import createManagerListHoc from 'shared/hoc/manager-list'
import Icon from 'themes/icon'
import slug from 'constants/slug'
import Breadcrumb from '../breadcrumb'

@createManagerListHoc({
  apiCall: StationApi.getStationTransits(),
  //apiDelete: StationApi.deleteStationBurial,
  itemPerPage: 10
})
@autobind
export default class LandfillList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.object,
    isLoading: PropTypes.bool,
    onChangePage: PropTypes.func,
    getIndexByPagination: PropTypes.func
  }

  getHead() {
    return [
      { content: 'STT', width: 10 },
      { content: 'Tên và địa chỉ' },
      { content: 'Ngày hoạt động' },
      { content: 'Ngày hoạt động' },
      { content: 'khối lượng tăng' },
      { content: 'Diện tích' },
      { content: 'Toạ độ' },
      { content: 'Tổ chức' },
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
            <span>
              {row.address} {row.district}
            </span>
          </div>
        )
      },
      {
        content: (
          <div>
            <span>{row.workFromTime}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <span>{row.workToTime}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <span>{row.arisesMass}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <span>{row.acreage}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <span>{(row.organization == null ? "" : row.organization.name)}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <LinkA to={slug.landFill.editWithCode + row._id}>Sửa</LinkA>
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
        title="Danh sách bãi"
        right={
          <LinkA to={slug.landFill.create}>
            <Button appearance="primary" iconBefore={Icon.landFill}>
              Tạo mới bãi
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
