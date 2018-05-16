import { translate } from 'hoc/create-lang'
import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'

export default createBreadcrumb({
  trigger: {
    id: 'base',
    icon: '',
    href: slug.controlStation.trigger,
    name: translate('controlStation.breadcrumb.trigger')
  },
  history: {
    id: 'history',
    href: slug.controlStation.history,
    name: translate('controlStation.breadcrumb.history')
  },
  config: {
    id: 'config',
    href: slug.controlStation.config,
    name: translate('controlStation.breadcrumb.config')
  }
})
