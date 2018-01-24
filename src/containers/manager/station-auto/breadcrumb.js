import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    //icon: Icon.car,
    href: slug.stationAuto.list,
    name: 'Station auto'
  },
  create: {
    id: 'create',
    href: slug.stationAuto.create,
    name: 'Create'
  },
  edit: {
    href: slug.stationAuto.edit,
    name: 'Update'
  }
})
