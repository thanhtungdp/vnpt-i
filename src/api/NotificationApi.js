import { getFetch } from 'utils/fetch'
import { getConfigApi } from 'config'

export function getNotification() {
  return getFetch(getConfigApi().fcmMessages)
}

export default {
  getNotification
}
