import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    icon: Icon.landFill,
    href: slug.landFill.base,
    name: 'Danh sách bãi chôn lấp'
  },
  create: {
    id: 'create',
    href: slug.landFill.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.landFill.edit,
    name: 'Chỉnh sửa'
  }
})
