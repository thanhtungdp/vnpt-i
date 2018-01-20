import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'users',
    icon: Icon.gallerySlider,
    href: slug.gallerySlider.base,
    name: 'Danh sách gallery slider'
  },
  create: {
    id: 'create',
    href: slug.gallerySlider.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.gallerySlider.edit,
    name: 'Chỉnh sửa'
  }
})
