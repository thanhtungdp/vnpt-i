const API_GATEWAY_TEST = 'http://localhost:3000'
const API_GATEWAY_RELEASE = 'http://swn.vietan-software.com:3000'

const AUTH_API = API_GATEWAY_RELEASE
const MANAGER_API = API_GATEWAY_TEST
const PORT_DEPLOY = 4000

module.exports.API_GATEWAY_TEST = API_GATEWAY_TEST
module.exports.API_GATEWAY_RELEASE = API_GATEWAY_RELEASE
module.exports.AUTH_API = AUTH_API
module.exports.MANAGER_API = MANAGER_API
module.exports.PORT_DEPLOY = PORT_DEPLOY

module.exports.default = {
  AUTH_API,
  MANAGER_API,
  PORT_DEPLOY
}
