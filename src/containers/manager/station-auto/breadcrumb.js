import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import { translate } from 'hoc/create-lang'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    //icon: Icon.car,
    href: slug.stationAuto.list,
    name: translate('stationAutoManager.list.title')
  },
  create: {
    id: 'create',
    href: slug.stationAuto.create,
    name: translate('stationAutoManager.create.label')
  },
  edit: {
    href: slug.stationAuto.edit,
    name: translate('stationAutoManager.edit.label')
  }
})
