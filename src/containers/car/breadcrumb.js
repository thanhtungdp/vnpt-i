import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    icon: Icon.car,
    href: slug.car.base,
    name: 'Danh sách xe'
  },
  create: {
    id: 'create',
    href: slug.car.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.car.edit,
    name: 'Chỉnh sửa'
  }
})
