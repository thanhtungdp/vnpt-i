import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import { translate } from 'hoc/create-lang'
//import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    href: slug.cameraControl.base,
    name: translate('cameraManager.breadcrumb.camera')
  },
  detail: {
    href: slug.cameraControl.detail,
    name: translate('cameraManager.breadcrumb.camera')
  }
})
