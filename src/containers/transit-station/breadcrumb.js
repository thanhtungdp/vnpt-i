import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    href: slug.StationTransit.base,
    name: 'Trạm chung chuyển',
    icon: Icon.StationTransit
  },
  create: {
    id: 'create',
    href: slug.StationTransit.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.StationTransit.edit,
    name: 'Chỉnh sửa'
  }
})
