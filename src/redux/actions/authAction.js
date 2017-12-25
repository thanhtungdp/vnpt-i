import AuthApi from '../../api/AuthApi'
export const UPDATE_USER_INFO = 'AUTH/update-user-info'

export function userLogin(resData) {
  return async dispatch => {
    const auth = await AuthApi.loginUser()
    dispatch({
      type: UPDATE_USER_INFO,
      auth
    })
    return auth
  }
}
