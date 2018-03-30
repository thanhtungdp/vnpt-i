import { ROLE_API } from 'config'
import { deleteFetch, getFetch, postFetch, putFetch } from 'utils/fetch'

const urlROLEAPI = ROLE_API + '/role'

export function getRole(
  { page = 1, itemPerPage = 10 },
  { unit = null, name = null }
) {
  var urlSearch = `${urlROLEAPI}?page=${page}&itemPerPage=${itemPerPage}`
  if (unit) urlSearch += `&unit=${unit}`
  if (name) urlSearch += `&name=${name}`
  return getFetch(urlSearch)
}

export default {
  getRole
}