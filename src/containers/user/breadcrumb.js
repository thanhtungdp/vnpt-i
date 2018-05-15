import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import { translate } from 'hoc/create-lang'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    //icon: Icon.car,
    href: slug.user.list,
    name: translate('userManager.breadcrumb.list')
  },
  create: {
    id: 'create',
    href: slug.user.create,
    name: translate('userManager.breadcrumb.create')
  },
  edit: {
    href: slug.user.edit,
    name: translate('userManager.breadcrumb.edit')
  }
})
