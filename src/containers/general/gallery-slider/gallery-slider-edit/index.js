import React from 'react'
import { autobind } from 'core-decorators'
import PageWrapper from 'layout/default-sidebar-layout/PageContainer'
import GallerySliderApi from 'api/GallerySliderApi'
import Button from 'components/elements/button'
import createManagerEdit, { managerPropTypes } from 'shared/hoc/manager-edit'
import slug from 'constants/slug'
import Breadcrumb from '../breadcrumb'
import GallerySliderForm from '../gallery-slider-form'

@createManagerEdit({
  apiGet: GallerySliderApi.getGallerySlider,
  apiUpdate: GallerySliderApi.updateGallerySlider,
  apiDelete: GallerySliderApi.deleteGallerySlider,
  redirectPath: slug.gallerySlider.list,
  paramKey: '_id'
})
@autobind
export default class GallerySliderEdit extends React.PureComponent {
  static propTypes = {
    ...managerPropTypes
  }

  render() {
    return (
      <PageWrapper
        right={
          <Button onClick={() => this.props.onDelete(this.props.formData.name)}>
            Xóa
          </Button>
        }
      >
        {this.props.isLoaded && (
          <div>
            <Breadcrumb
              items={[
                'list',
                {
                  id: 'edit',
                  name: this.props.formData.name
                }
              ]}
            />
            <GallerySliderForm
              isEdit
              initialValues={this.props.formData}
              onSubmit={this.props.onUpdate}
            />
          </div>
        )}
      </PageWrapper>
    )
  }
}
