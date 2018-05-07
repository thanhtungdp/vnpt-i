import { AUTH_API } from '../config'
import { getFetch, postFetch, putFetch } from '../utils/fetch'

export function loginUser(data = {}) {
  return postFetch(AUTH_API + '/auth/login', data)
}

export function loginUser2Factor(data = {}) {
  return postFetch(AUTH_API + '/auth/security-2fa', data)
}

export function getMe() {
  return getFetch(AUTH_API + '/auth/me')
}

export function changePassword(_id, data) {
  return postFetch(AUTH_API + '/auth/change-password/' + _id, data)
}

export function putProfile(_id, data) {
  return putFetch(AUTH_API + '/user/organization/' + _id, data)
}

export function putSecurity(data) {
  return putFetch(AUTH_API + '/user/organization/security/2fa', data)
}

//Send Code
export function GetForgotSendCode(email) {
  return getFetch(AUTH_API + `/auth/forgot-password?email=${email}`)
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
  loginUser2Factor,
  getMe,
  changePassword,
  putProfile,
  putSecurity,
  GetForgotSendCode,
  PostConfirmCode,
  PutResetPassword
}
