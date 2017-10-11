import { AUTH_API } from '../config'
import { postFetch } from '../utils/fetch'

export function loginUser() {
  return postFetch(AUTH_API)
}

export default {
  loginUser
}
