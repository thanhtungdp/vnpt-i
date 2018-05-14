import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    //icon: Icon.car,
    href: slug.stationType.list,
    name: 'Type Of Station'
  },
  create: {
    id: 'create',
    href: slug.stationType.create,
    name: 'Create'
  },
  edit: {
    href: slug.stationType.edit,
    name: 'Update'
  }
})
