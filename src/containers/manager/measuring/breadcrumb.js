import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
// import { translate } from 'hoc/create-lang'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    //icon: Icon.car,
    href: slug.role.list,
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
