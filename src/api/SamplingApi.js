import { getConfigApi } from '../config'
import { getFetch, postFetch, putFetch, uploadMultipleFile } from '../utils/fetch'

function getSamplingUrl(prefix = '') {
  return getConfigApi().sampling + '/' + prefix
}

//Lấy thông tin điều khiển của trạm theo mã trạm
export function getStationControl(key, organizationId) {
  return getFetch(getSamplingUrl(key + '/' + organizationId))
}

//Cấu hình lấy mẫu theo trạm
export function config_StationControl(data) {
  return postFetch(getSamplingUrl('config-reset'), data)
}

//Lấy nhật ký điều khiển của trạm theo mã trạm
export function getHistory_StationControl(key, organizationId) {
  return getFetch(getSamplingUrl('logs/' + key + '/' + organizationId))
}

//Điều khiển lấy mẫu theo trạm, tự đông và thủ công, huỷ lấy mẫu
export function trigger_StationControl(data) {
  return putFetch(getSamplingUrl(''), data)
}

//Kích hoạt lấy mẫu vượt ngưỡng
export function triggerExceeded_StationControl(data) {
  return postFetch(getSamplingUrl('exceeded'), data)
}

//Check máy lấy mẫu
export function checkStationControl(key, organizationId) {
  return getFetch(getSamplingUrl('check-status/' + key + '/' + organizationId))
}

// Upload 3 file config máy lấy mẫu
export function uploadSampleConfig(files){
  // TODO: Khi deploy lên server khi phải sửa lại url.
  return uploadMultipleFile(getConfigApi().sampleConfig, files)
}

export default {
  getStationControl,
  getHistory_StationControl,
  trigger_StationControl,
  config_StationControl,
  triggerExceeded_StationControl,
  checkStationControl,
  uploadSampleConfig
}
