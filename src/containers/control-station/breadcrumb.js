import { translate } from 'hoc/create-lang'
import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'

export default createBreadcrumb({
  trigger: {
    id: 'base',
    icon: '',
    href: slug.controlStation.trigger,
    name: 'Control Satation'
    // name: translate('controlStation.text')
  },
  history: {
    id: 'history',
    href: slug.controlStation.history,
    // name: translate('controlStation.history.base')
    name: 'History'
  },
  config: {
    id: 'config',
    href: slug.controlStation.config,
    //  name: translate('controlStation.config.base')
    name: 'Config'
  }
})
