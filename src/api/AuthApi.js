import { AUTH_API } from '../config'
import { getFetch, postFetch, putFetch } from '../utils/fetch'

export function loginUser(data = {}) {
  return postFetch(AUTH_API + '/auth/login', data)
}

export function getMe() {
  return getFetch(AUTH_API + '/auth/me')
}

export function changePassword(_id, data) {
  return postFetch(AUTH_API + '/auth/change-password/' + _id, data)
}

export function putProfile(_id, data) {
  return putFetch(AUTH_API + '/auth/' + _id, data)
}

export default {
  loginUser,
  getMe,
  changePassword,
  putProfile
}
