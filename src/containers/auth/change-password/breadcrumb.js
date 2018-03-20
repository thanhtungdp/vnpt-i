import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  base: {
    id: 'base',
    icon: '',
    href: slug.user.changePassword,
    name: 'Change password'
  }
})
