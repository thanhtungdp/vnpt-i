import { ORGANIZATION_API } from '../config'
import { getFetch, postFetch, putFetch } from 'utils/fetch'
import queryString from 'query-string'

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

export function getOneOrganizations({ _id }) {
  return getFetch(getUrl(_id))
}

export function createOrganizations({ name, address, description, director }) {
  return postFetch(getUrl(), {
    name,
    address,
    description,
    director
  })
}

export function updateOrganizations({
  _id,
  name,
  address,
  description,
  director
}) {
  return putFetch(getUrl(_id), {
    name,
    address,
    description,
    director
  })
}

export default {
  getOrganizations,
  createOrganizations,
  updateOrganizations,
  getOrganizationsFilter
}
