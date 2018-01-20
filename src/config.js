const API_GATEWAY_TEST = 'http://localhost:3003'
const API_GATEWAY_RELEASE = 'http://swn.vietan-software.com:3000'

const AUTH_API = 'https://auth-api.tungtung.vn'
const ADMIN_API = 'http://localhost:1200/admin'
const MEDIA_API = 'https://media.tungtung.vn'
const PORT_DEPLOY = 1008

module.exports.API_GATEWAY_TEST = API_GATEWAY_TEST
module.exports.API_GATEWAY_RELEASE = API_GATEWAY_RELEASE
module.exports.AUTH_API = AUTH_API
module.exports.ADMIN_API = ADMIN_API
module.exports.MEDIA_API = MEDIA_API
module.exports.PORT_DEPLOY = PORT_DEPLOY

module.exports.default = {
  API_GATEWAY_TEST,
  API_GATEWAY_RELEASE,
  AUTH_API,
  ADMIN_API,
  MEDIA_API,
  PORT_DEPLOY
}
