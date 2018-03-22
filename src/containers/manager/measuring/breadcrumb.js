import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
// import { translate } from 'hoc/create-lang'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    //icon: Icon.car,
    href: slug.measuring.list,
    name: 'Measuring'
  },
  create: {
    id: 'create',
    href: slug.measuring.create,
    name: 'Create'
  },
  edit: {
    href: slug.measuring.edit,
    name: 'Update'
  }
})
