import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    icon: Icon.quizLists,
    href: slug.quizLists.base,
    name: 'Đề thi'
  },
  create: {
    id: 'create',
    href: slug.quizLists.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.quizLists.edit,
    name: 'Chỉnh sửa'
  }
})
