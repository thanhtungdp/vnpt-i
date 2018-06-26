import { getConfigApi } from '../config'
import { getFetch } from 'utils/fetch'

export function getSubscription() {
  let urlFetch = getConfigApi().organization + '/subscription/status'
  return getFetch(urlFetch)
}

export default {
  getSubscription
}
