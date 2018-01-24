import AuthApi from '../../api/AuthApi'
import { setAuthToken, getAuthToken, resetAuthToken } from 'utils/auth'

export const UPDATE_USER_INFO = 'AUTH/update-user-info'
export const FETCH_PENDING_USER = 'AUTH/fetch-pending-user'
export const FETCH_SUCCESS_USER = 'AUTH/fetch-success-user'
export const FETCH_FAIL_USER = 'AUTH/fetch-fail-user'
export const USER_LOGOUT = 'AUTH/user-lgoout'

export function fetchUserMe() {
  return async dispatch => {
    if (!getAuthToken()) {
      dispatch({
        type: FETCH_FAIL_USER
      })
      return { error: true }
    }
    dispatch({
      type: FETCH_PENDING_USER
    })
    const auth = await AuthApi.getMe()
    console.log(auth)
    if (auth.error) {
      dispatch({
        type: FETCH_FAIL_USER
      })
    } else {
      dispatch({
        type: FETCH_SUCCESS_USER,
        token: getAuthToken(),
        auth: auth.data
      })
    }
    return auth
  }
}

export function logout() {
  resetAuthToken()
  return {
    type: USER_LOGOUT
  }
}

export function userLogin(resData) {
  return async dispatch => {
    const auth = await AuthApi.loginUser(resData)
    if (auth.success) {
      setAuthToken(auth.token)
      dispatch({
        type: UPDATE_USER_INFO,
        auth
      })
    }
    return auth
  }
}
