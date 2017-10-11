const AUTH_TOKEN = 'authToken'

export function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN, token)
}

export function resetAuthToken() {
  localStorage.removeItem(AUTH_TOKEN)
}

export function getAuthToken(hasJWTString = false) {
  if (
    localStorage.getItem(AUTH_TOKEN) === 'null' ||
    !localStorage.getItem(AUTH_TOKEN)
  )
    return null
  return (hasJWTString ? 'JWT ' : '') + localStorage.getItem(AUTH_TOKEN)
}

export default {
  setAuthToken,
  resetAuthToken,
  getAuthToken
}
