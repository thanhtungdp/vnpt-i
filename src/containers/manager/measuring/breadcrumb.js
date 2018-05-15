import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import { translate } from 'hoc/create-lang'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    //icon: Icon.car,
    href: slug.measuring.list,
    name: translate('parameterManager.breadcrumb.base')
  },
  create: {
    id: 'create',
    href: slug.measuring.create,
    name: translate('parameterManager.breadcrumb.create')
  },
  edit: {
    href: slug.measuring.edit,
    name: translate('parameterManager.breadcrumb.edit')
  }
})
