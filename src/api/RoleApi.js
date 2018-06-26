import { getConfigApi } from 'config'
import { deleteFetch, getFetch, postFetch, putFetch } from 'utils/fetch'

function getUrl(path = '') {
  return getConfigApi().role + '/' + path
}

export function getRoles({ page = 1, itemPerPage = 2 }) {
  return getFetch(getUrl(`?itemPerPage=${itemPerPage}&page=${page}`))
}

export function createRole(data = {}) {
  return postFetch(getUrl(), data)
}

export function deleteRole(_id) {
  return deleteFetch(getUrl(`${_id}`))
}

export function getRole(_id) {
  return getFetch(getUrl() + `${_id}`)
}

export function updateRole(_id, data) {
  return putFetch(getUrl() + `${_id}`, data)
}

export default {
  getRoles,
  createRole,
  deleteRole,
  getRole,
  updateRole
}
