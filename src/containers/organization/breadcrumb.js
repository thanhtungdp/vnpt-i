import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    icon: Icon.organization,
    href: slug.organization.base,
    name: 'Danh sách tổ chức'
  },
  create: {
    id: 'create',
    href: slug.organization.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.organization.edit,
    name: 'Chỉnh sửa'
  }
})
