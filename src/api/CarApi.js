import { CAR_API } from '../config'
import { getFetch, postFetch, putFetch } from 'utils/fetch'
import queryString from 'query-string'

const MAX_VALUE = 99999

function getUrl(path = '') {
  return CAR_API + '/cars/' + path
}

export function getCars({ itemPerPage = 10, page = 1 }) {
  return getFetch(getUrl(`?itemPerPage=${itemPerPage}&page=${page}`))
}

export function getCarsFilter({
  code,
  truckLoad,
  type,
  description,
  organization
}) {
  let query = {
    itemPerPage: MAX_VALUE
  }
  if (code) query.code = code
  if (truckLoad) query.truckLoad = truckLoad
  if (type) query.type = type
  if (description) query.description = description
  if (organization) query.organization = organization
  return getFetch(getUrl('?' + queryString.stringify(query, '&')))
}

export function getOneCars({ code }) {
  return getFetch(getUrl(code))
}

export function createCars({
  code,
  truckLoad,
  type,
  description,
  organization
}) {
  return postFetch(getUrl(), {
    code,
    truckLoad,
    type,
    description,
    organization
  })
}

export function updateCars({
  code,
  truckLoad,
  type,
  description,
  organization
}) {
  return putFetch(getUrl(code), {
    truckLoad,
    type,
    description,
    organization
  })
}

export function getListByOrganization({ _id }) {
  return postFetch(getUrl('getListByOrganization'), {
    _id
  })
}

export default {
  getCars,
  createCars,
  updateCars,
  getCarsFilter,
  getListByOrganization
}
