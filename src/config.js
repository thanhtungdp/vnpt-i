/* eslint-disable */
export function getConfigApi() {
  const config = window.config
  function c(prefix) {
    return config.apiGateway + '/' + prefix
  }
  return {
    gateway: config.apiGateway,
    media: config.apiMedia,
    camera: config.apiCamera,
    auth: c('auth'),
    user: c('user'),
    measuring: c('measuring'),
    stationType: c('station-type'),
    stationAuto: c('station-auto'),
    dataStationAuto: c('data-station-auto'),
    ftp: c('ftp'),
    fcmMessages: c('fcm-messages'),
    organization: c('organization'),
    role: c('role'),
    sampling: c('sampling')
  }
}

export const GOOGLE_MAP = {
  KEY: 'AIzaSyB2-wp_CpzQQOkmacIaA2Xj90G8E_wiJiw'
}
