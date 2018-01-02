import { CAR_LOGS_API } from '../config'
import { getFetch } from 'utils/fetch'
import queryString from 'query-string'

const MAX_VALUE = 99999

function getUrl(path = '') {
  return CAR_LOGS_API + '/car-logs/' + path
}

export function getLastMapLocation({ code }) {
  return getFetch(getUrl(code + '/last'))
}

export default {
  getLastMapLocation
}
