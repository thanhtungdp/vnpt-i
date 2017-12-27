import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: "list",
    href: slug.category.base,
    name: 'Danh sách chuyên mục',
    icon: Icon.category
  },
  create: {
    id: "create",
    href: slug.category.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.category.edit,
    name: 'Chỉnh sửa'
  }
})