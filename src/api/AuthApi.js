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

//Send Code
export function GetForgotSendCode(email) {
  return getFetch(AUTH_API + `/auth/forgot-password?usernameOrEmail=${email}`)
}

//confirm Code
export function PostConfirmCode(data) {
  return postFetch(AUTH_API + '/auth/forgot-password', data)
}

//Reset password
export function PutResetPassword(_id, data) {
  return putFetch(AUTH_API + `/auth/forgot-password/${_id}`, data)
}

export default {
  loginUser,
  getMe,
  changePassword,
  putProfile,
  GetForgotSendCode,
  PostConfirmCode,
  PutResetPassword
}
