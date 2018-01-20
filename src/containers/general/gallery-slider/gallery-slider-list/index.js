import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import LinkA from 'components/elements/link-a/index'
import DynamicTable from 'components/elements/dynamic-table/index'
import Clearfix from 'components/elements/clearfix/index'
import GallerySliderApi from 'api/GallerySliderApi'
import Link from 'components/elements/link'
import Button from 'components/elements/button'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import createManagerListHoc from 'shared/hoc/manager-list/index'
import slug from 'constants/slug'
import Breadcrumb from '../breadcrumb'

@createManagerListHoc({
  apiCall: GallerySliderApi.getGallerySliders,
  apiDelete: GallerySliderApi.deleteGallerySlider,
  keyData: 'data',
  itemPerPage: 50
})
@autobind
export default class GallerySliderList extends PureComponent {
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
      { content: 'TT', width: 5 },
      { content: 'Tên' },
      { content: 'Mô tả' },
      { content: 'Số lượng ảnh' },
      { content: 'Hành động' }
    ]
  }

  getRows() {
    return this.props.data.map((slider, index) => [
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
        content: <div>{slider.name}</div>
      },
      {
        content: <div>{slider.description}</div>
      },
      {
        content: <div>{slider.images.length}</div>
      },
      {
        content: (
          <div>
            <Link to={`${slug.gallerySlider.editWithCode}${slider._id}`}>
              Sửa
            </Link>
            &nbsp;
            <LinkA
              colorType="red"
              onClick={e =>
                this.props.onDeleteItem(
                  e,
                  slider.name,
                  item => item._id === slider._id,
                  slider._id
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
        title="Danh sách gallery slider"
        right={
          <Link to={slug.gallerySlider.create}>
            <Button>Tạo mới</Button>
          </Link>
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
