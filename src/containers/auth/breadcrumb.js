import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  changePassword: {
    id: 'changePassword',
    icon: '',
    href: slug.user.changePassword,
    name: 'Change password'
  },
  profileUser: {
    id: 'profileUser',
    icon: '',
    href: slug.user.profile,
    name: 'Profile user'
  }
})
