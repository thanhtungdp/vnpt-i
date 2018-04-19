import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'base',
    icon: '',
    href: slug.camera.base,
    name: 'Camera'
  },
  edit: {
    id: 'base',
    icon: '',
    href: slug.camera.base,
    name: 'Camera'
  }
})
