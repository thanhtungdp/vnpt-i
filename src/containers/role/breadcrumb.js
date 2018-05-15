import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import { translate } from 'hoc/create-lang'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'base',
    icon: '',
    href: slug.role.base,
    name: translate('roleManager.breadcrumb.list')
  },
  create: {
    id: 'create',
    href: slug.role.create,
    name: translate('roleManager.breadcrumb.create')
  },
  edit: {
    href: slug.role.edit,
    name: translate('roleManager.breadcrumb.edit')
  }
})
