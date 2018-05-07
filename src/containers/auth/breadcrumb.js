import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'

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
  },
  security: {
    id: 'security',
    icon: '',
    href: slug.user.security,
    name: 'Security setting'
  }
})
