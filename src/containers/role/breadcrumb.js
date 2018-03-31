import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'base',
    icon: '',
    href: slug.role.base,
    name: 'Role'
  },
  create: {
    id: 'create',
    href: slug.role.create,
    name: 'Create'
  },
  edit: {
    href: slug.role.edit,
    name: 'Update'
  }
})
