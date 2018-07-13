import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import { translate } from 'hoc/create-lang'

export default createBreadcrumb({
  base: {
    id: 'base',
    href: slug.support.base,
    name: translate('support.breadcrumb.base')
  }
})
