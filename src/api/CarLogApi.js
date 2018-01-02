import { CAR_LOGS_API } from '../config'
import { getFetch } from 'utils/fetch'

function getUrl(path = '') {
  return CAR_LOGS_API + '/car-logs/' + path
}

export function getLastMapLocation({ code }) {
  return getFetch(getUrl(code + '/last'))
}

export default {
  getLastMapLocation
}
