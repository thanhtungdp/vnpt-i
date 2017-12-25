import { ORGANIZATION_API } from '../config'
import { getFetch, postFetch, putFetch } from 'utils/fetch'
import { debug } from 'util'

const MAX_VALUE = 99999
export function getOrganizations({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    ORGANIZATION_API + '?itemPerPage=' +
    itemPerPage +
    '&page=' +
    page
  )
}

export function getOrganizationsFilter({
  name,
  address,
  director,
  description
}) {
  let url = ORGANIZATION_API + '?itemPerPage=' + MAX_VALUE + '&'
  if (name) url += 'name=' + name + '&'
  if (address) url += 'address=' + address + '&'
  if (director) url += 'director=' + director + '&'
  if (description) url += 'description=' + description + '&'
  return getFetch(url)
}

export function getOneOrganizations({ _id }) {
  return getFetch(ORGANIZATION_API + _id)
}

export function createOrganizations({ name, address, description, director }) {
  return postFetch(ORGANIZATION_API, {
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
  return putFetch(ORGANIZATION_API + _id, {
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
