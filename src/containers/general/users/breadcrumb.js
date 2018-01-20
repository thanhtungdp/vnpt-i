import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'users',
    icon: Icon.users,
    href: slug.users.base,
    name: 'Danh sách thành viên'
  },
  create: {
    id: 'create',
    href: slug.users.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.users.edit,
    name: 'Chỉnh sửa'
  }
})
