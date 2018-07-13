import { getConfigApi } from 'config'
import { getFetch, postFetch } from 'utils/fetch'

export function getUploadUrl() {
  return getConfigApi().support + '/upload'
}

export function getType() {
  let url = getConfigApi().support + '/type'
  return getFetch(url)
}

export function sendRequest(request) {
  let url = getConfigApi().support + '/create-request'
  return postFetch(url, request)
}

export default {
  sendRequest,
  getUploadUrl,
  getType
}
