import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    href: slug.stationTransit.base,
    name: 'Trạm chung chuyển',
    icon: Icon.transitStation
  },
  create: {
    id: 'create',
    href: slug.stationTransit.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.stationTransit.edit,
    name: 'Chỉnh sửa'
  }
})
