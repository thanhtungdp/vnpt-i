import { USER_API } from '../config'
import { getFetch, postFetch, putFetch, deleteFetch } from 'utils/fetch'

export function searchUser(
  { page = 1, itemPerPage = 10 },
  { userName, email, firstName, lastName, organization, phone }
) {
  var urlSearch =
    USER_API + `/user/organization/?page=${page}&itemPerPage=${itemPerPage}`
  if (userName) urlSearch += `&username=${userName}`
  if (email) urlSearch += `&email=${email}`
  if (firstName) urlSearch += `&firstName=${firstName}`
  if (lastName) urlSearch += `&lastName=${lastName}`
  if (organization) urlSearch += `&organization=${organization}`
  if (phone) urlSearch += `&phone=${encodeURIComponent(phone)}`

  return getFetch(urlSearch)
}

export function registerUser(data = {}) {
  return postFetch(USER_API + '/user/organization', data)
}

export function getOne(_id) {
  let urlFetch = USER_API + '/user/organization/' + _id
  return getFetch(urlFetch)
}

export function getTotalCount() {
  let urlFetch = USER_API + '/user/organization/subscription/total-count'
  return getFetch(urlFetch)
}

export function updateOne(_id, user = {}) {
  let urlFetch = USER_API + '/user/organization/' + _id
  return putFetch(urlFetch, user)
}

export function deleteOne(_id) {
  let urlFetch = USER_API + '/user/organization/' + _id
  return deleteFetch(urlFetch)
}

export function updateRole(_id, data = {}) {
  let urlFetch = USER_API + '/user/organization/role/' + _id
  return putFetch(urlFetch, data)
}

export function accountActivate(code) {
  let urlFetch = USER_API + '/trial-register/account-activate/' + code
  return putFetch(urlFetch)
}

export default {
  searchUser,
  registerUser,
  getOne,
  updateOne,
  deleteOne,
  updateRole,
  accountActivate,
  getTotalCount
}
