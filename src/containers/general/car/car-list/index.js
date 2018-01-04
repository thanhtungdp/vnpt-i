import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from '@atlaskit/button'
import LinkA from 'components/elements/link-a/index'
import CarApi from 'api/CarApi'
import DynamicTable from 'components/elements/dynamic-table/index'
import Clearfix from 'components/elements/clearfix/index'
import LinkCustom from 'components/elements/link/index'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import createManagerListHoc from 'shared/hoc/manager-list/index'
import Icon from 'themes/icon'
import Slug from 'constants/slug'
import Breadcrumb from '../breadcrumb'

@createManagerListHoc({
  apiCall: CarApi.getCars,
  apiDelete: CarApi.deleteCar,
  itemPerPage: 10
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

  deleteItem(_id) {
    console.log(_id)
  }

  getHead() {
    return [
      { content: 'TT', width: 10 },
      { content: 'Biển số xe' },
      { content: 'Loại' },
      { content: 'Trọng tải' },
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
            <strong>{row.code}</strong>
            <br />
            {row.organization && <span>{row.organization.name}</span>}
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
            <span>{row.truckLoad}</span>
          </div>
        )
      },
      {
        content: (
          <div>
            <LinkCustom to={Slug.car.editWithCode + `${row.code}`}>
              Chỉnh sửa
            </LinkCustom>
            &nbsp;&nbsp;
            <LinkA
              colorType="red"
              onClick={e =>
                this.props.onDeleteItem(
                  e,
                  row.code,
                  item => row.code === item.code,
                  row.code
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
        title="Danh sách Xe"
        right={
          <LinkCustom to={Slug.car.create}>
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
          onSetPage={this.props.onChangePage}
          isLoading={this.props.isLoading}
        />
        <Clearfix height={64} />
      </PageContainer>
    )
  }
}
