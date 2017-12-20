import { AUTH_API } from '../config'
import { postFetch } from '../utils/fetch'

export function loginUser(resData) {
  return postFetch(AUTH_API,resData)
}

export default {
  loginUser
}
