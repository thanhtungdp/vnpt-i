import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    //icon: Icon.car,
    href: slug.user.list,
    name: 'User'
  },
  create: {
    id: 'create',
    href: slug.user.create,
    name: 'Create'
  },
  edit: {
    href: slug.user.edit,
    name: 'Update'
  }
})
