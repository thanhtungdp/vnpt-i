import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  trigger: {
    id: 'base',
    icon: '',
    href: slug.controlStation.trigger,
    name: 'Control Station'
  },
  history: {
    id: 'history',
    href: slug.controlStation.history,
    name: 'History'
  },
  config: {
    id: 'config',
    href: slug.controlStation.config,
    name: 'Config'
  }
})
