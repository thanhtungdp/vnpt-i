import { STATION_CONTROL_API } from '../config'
import { deleteFetch, getFetch, postFetch, putFetch } from '../utils/fetch'

//Lấy thông tin điều khiển của trạm theo mã trạm
export function getStationControl(key) {
  return getFetch(STATION_CONTROL_API + '/LayMau_MT/' + key)
}

//Lấy nhật ký điều khiển của trạm theo mã trạm
export function getHistory_StationControl(key) {
  return getFetch(STATION_CONTROL_API + '/NhatKyLayMau_MT/' + key)
}

//Điều khiển lấy mẫu theo trạm
export function trigger_StationControl(status, measuring = {}) {
  return putFetch(STATION_CONTROL_API + '/LayMau_MT/' + status, measuring)
}

//Cấu hình lấy mẫu theo trạm
export function config_StationControl(data) {
  return postFetch(
    STATION_CONTROL_API +
      `/LayMau_MT_CauHinh_Reset/${data.config}?maTram=${
        data.stationKey
      }&tenTram=${data.stationName}&mt_Name=${data.mt_Name}&tongSoChai=${
        data.total
      }`
  )
}
//Kích hoạt lấy mẫu vượt ngưỡng
export function triggerExceeded_StationControl(key, status) {
  return getFetch(
    STATION_CONTROL_API +
      `/LayMau_MT_LMVN?maTram=${key}&layMauVuotNguong=${status}`
  )
}
export default {
  getStationControl,
  getHistory_StationControl,
  trigger_StationControl,
  config_StationControl,
  triggerExceeded_StationControl
}
