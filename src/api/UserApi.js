import { ADMIN_API } from '../config'
import { getFetch } from 'utils/fetch'

function getUrl(path = '') {
  return ADMIN_API + '/' + path
}

export function getUsers({ itemPerPage = 10, page = 1 }) {
  return getFetch(getUrl(`users/?itemPerPage=${itemPerPage}&page=${page}`))
}
