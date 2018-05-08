import { getFetch } from 'utils/fetch'
import { FCM_API } from 'config'

export function getNotification() {
  let urlSearch = `${FCM_API}/fcm-messages`
  return getFetch(urlSearch)
}

export default {
  getNotification
}
