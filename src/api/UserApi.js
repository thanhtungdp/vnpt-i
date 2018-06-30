import { getConfigApi } from '../config'
import { getFetch, postFetch, putFetch, deleteFetch } from 'utils/fetch'

function getUserUrl(prefix = '') {
  return getConfigApi().user + '/' + prefix
}

function getTrialRegisterUrl(prefix = '') {
  return getConfigApi().trialRegister + '/' + prefix
}

export function searchUser(
  { page = 1, itemPerPage = 10 },
  { userName, email, firstName, lastName, organization, phone }
) {
  var urlSearch = getUserUrl(
    `organization/?page=${page}&itemPerPage=${itemPerPage}`
  )
  if (userName) urlSearch += `&username=${userName}`
  if (email) urlSearch += `&email=${email}`
  if (firstName) urlSearch += `&firstName=${firstName}`
  if (lastName) urlSearch += `&lastName=${lastName}`
  if (organization) urlSearch += `&organization=${organization}`
  if (phone) urlSearch += `&phone=${encodeURIComponent(phone)}`

  return getFetch(urlSearch)
}

export function registerUser(data = {}) {
  return postFetch(getUserUrl('organization'), data)
}

export function getOne(_id) {
  return getFetch(getUserUrl(`organization/${_id}`))
}

export function getTotalCount() {
  return getFetch(getUserUrl('organization/subscription/total-count'))
}

export function updateOne(_id, user = {}) {
  return putFetch(getUserUrl(`organization/${_id}`), user)
}

export function deleteOne(_id) {
  return putFetch(getUserUrl(`organization/delete/${_id}`))
}

export function removeOne(_id) {
  return deleteFetch(getUserUrl(`organization/${_id}`))
}

export function restoreOne(_id) {
  return putFetch(getUserUrl('organization/restore/' + _id))
}

export function updateRole(_id, data = {}) {
  return putFetch(getUserUrl(`organization/role/${_id}`), data)
}

export function accountActivate(code) {
  return putFetch(
    getTrialRegisterUrl('trial-register/account-activate/' + code)
  )
}

export function accountEnable(_id, data = {}) {
  return putFetch(getUserUrl('organization/enable/' + _id), data)
}

export default {
  searchUser,
  registerUser,
  getOne,
  updateOne,
  deleteOne,
  restoreOne,
  removeOne,
  updateRole,
  accountActivate,
  getTotalCount,
  accountEnable
}
