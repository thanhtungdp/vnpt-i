import { ORGANIZATION_API } from '../config'
import { getFetch } from 'utils/fetch'

export function getSubscription() {
  let urlFetch = ORGANIZATION_API + '/organization/subscription/status'
  return getFetch(urlFetch)
}

export default {
  getSubscription
}
