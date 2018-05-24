import { STATION_CONTROL_API } from '../config'
import { getFetch, postFetch, putFetch } from '../utils/fetch'

//Lấy thông tin điều khiển của trạm theo mã trạm
export function getStationControl(key, organizationId) {
  return getFetch(STATION_CONTROL_API + '/sampling-api/sampling/' + key + '/' + organizationId)
}

//Cấu hình lấy mẫu theo trạm
export function config_StationControl(data) {
  return postFetch(
    STATION_CONTROL_API + `/sampling-api/sampling-config-reset`,
    data
  )
}

//Lấy nhật ký điều khiển của trạm theo mã trạm
export function getHistory_StationControl(key, organizationId) {
  return getFetch(STATION_CONTROL_API + '/sampling-api/sampling-logs/' + key + '/' + organizationId)
}

//Điều khiển lấy mẫu theo trạm, tự đông và thủ công, huỷ lấy mẫu
export function trigger_StationControl(data) {
  return putFetch(STATION_CONTROL_API + '/sampling-api/sampling/', data)
}

//Kích hoạt lấy mẫu vượt ngưỡng
export function triggerExceeded_StationControl(data) {
  return postFetch(
    STATION_CONTROL_API + `/sampling-api/sampling-exceeded`,
    data
  )
}

//Check máy lấy mẫu
export function checkStationControl(key, organizationId) {
  return getFetch(STATION_CONTROL_API + '/sampling-api/sampling-check/' + key + '/' + organizationId)
}

export default {
  getStationControl,
  getHistory_StationControl,
  trigger_StationControl,
  config_StationControl,
  triggerExceeded_StationControl,
  checkStationControl
}
