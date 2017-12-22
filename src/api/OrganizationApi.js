import { getFetch, postFetch, putFetch } from 'utils/fetch'
import { debug } from 'util'

const MAX_VALUE = 99999
export function getOrganizations({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    'http://localhost:1103/organization/?itemPerPage=' +
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
  let url = 'http://localhost:1103/organization/?itemPerPage=' + MAX_VALUE + '&'
  if (name) url += 'name=' + name + '&'
  if (address) url += 'address=' + address + '&'
  if (director) url += 'director=' + director + '&'
  if (description) url += 'description=' + description + '&'
  return getFetch(url)
}

export function getOneOrganizations({ _id }) {
  return getFetch('http://localhost:1103/organization/getOne?_id=' + _id)
}

export function createOrganizations({ name, address, description, director }) {
  return postFetch('http://localhost:1103/organization/', {
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
  return putFetch('http://localhost:1103/organization/' + _id, {
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
