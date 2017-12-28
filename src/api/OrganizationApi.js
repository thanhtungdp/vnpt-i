import { ORGANIZATION_API } from '../config'
import { getFetch, postFetch, putFetch } from 'utils/fetch'
<<<<<<< HEAD
import queryString from 'query-string'
=======
import { deleteFetch } from '../utils/fetch'
>>>>>>> develop

const MAX_VALUE = 99999

function getUrl(path = '') {
  return ORGANIZATION_API + '/organizations/' + path
}

export function getOrganizations({ itemPerPage = 10, page = 1 }) {
  return getFetch(getUrl(`?itemPerPage=${itemPerPage}&page=${page}`))
}

export function getOrganizationsFilter({
  name,
  address,
  director,
  description
}) {
  let query = {
    itemPerPage: MAX_VALUE
  }
  if (name) query.name = name
  if (address) query.address = address
  if (director) query.director = director
  if (description) query.description = description
  return getFetch(getUrl('?' + queryString.stringify(query, '&')))
}

export function getOrganization(_id) {
  return getFetch(getUrl(_id))
}

export function createOrganization(data = {}) {
  return postFetch(getUrl(), data)
}

export function updateOrganization(_id, data = {}) {
  return putFetch(getUrl(_id), data)
}

export function deleteOrganization(_id, data = {}) {
  return deleteFetch(getUrl(_id), data)
}

export default {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganizationsFilter
}
