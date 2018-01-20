import React from 'react'
import { autobind } from 'core-decorators'
import PageWrapper from 'layout/default-sidebar-layout/PageContainer'
import GallerySliderApi from 'api/GallerySliderApi'
import managerCreate, { createPropTypes } from 'shared/hoc/manager-create'
import slug from 'constants/slug'
import Breadcrumb from '../breadcrumb'
import GallerySliderForm from '../gallery-slider-form'

@managerCreate({
  apiCreate: GallerySliderApi.createGallerySlider,
  redirectPath: slug.gallerySlider.list
})
@autobind
export default class GallerySliderCreate extends React.PureComponent {
  static propTypes = {
    ...createPropTypes
  }
  render() {
    return (
      <PageWrapper>
        <Breadcrumb items={['list', 'create']} />
        <GallerySliderForm onSubmit={this.props.onCreate} />
      </PageWrapper>
    )
  }
}
