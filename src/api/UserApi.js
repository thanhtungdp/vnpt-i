import { AUTH_API } from '../config'
import { getFetch, postFetch, putFetch, deleteFetch } from 'utils/fetch'

export function searchUser(
  { page = 1, itemPerPage = 10 },
  { userName, email, firstName, lastName, organization, phone }
) {
  var urlSearch = AUTH_API + `/auth/?page=${page}&itemPerPage=${itemPerPage}`
  if (userName) urlSearch += `&username=${userName}`
  if (email) urlSearch += `&email=${email}`
  if (firstName) urlSearch += `&firstName=${firstName}`
  if (lastName) urlSearch += `&lastName=${lastName}`
  if (organization) urlSearch += `&organization=${organization}`
  if (phone) urlSearch += `&phone=${encodeURIComponent(phone)}`

  return getFetch(urlSearch)
}

export function registerUser(data = {}) {
  return postFetch(AUTH_API + '/auth/register', data)
}

export function getOne(_id) {
  let urlFetch = AUTH_API + '/auth/' + _id
  return getFetch(urlFetch)
}

export function updateOne(_id, user = {}) {
  let urlFetch = AUTH_API + '/auth/' + _id
  return putFetch(urlFetch, user)
}

export function deleteOne(_id) {
  let urlFetch = AUTH_API + '/auth/' + _id
  return deleteFetch(urlFetch)
}

export function updateRole(_id, data = {}) {
  let urlFetch = AUTH_API + '/auth/role/' + _id
  return putFetch(urlFetch, data)
}


export default {
  searchUser,
  registerUser,
  getOne,
  updateOne,
  deleteOne,
  updateRole
}
