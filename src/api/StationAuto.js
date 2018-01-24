import { STATION_AUTO_API } from '../config'
import { deleteFetch, getFetch, postFetch, putFetch } from '../utils/fetch'

export function getStationAutos(
  { page = 1, itemPerPage = 10 },
  { address, stationType, name }
) {
  var url = `${STATION_AUTO_API}/station-auto?page=${page}&itemPerPage=${itemPerPage}`
  if (address) url += `&address=${address}`
  if (stationType) url += `&stationType=${stationType}`
  if (name) url += `&name=${name}`
  return getFetch(url)
}

export function getStationAuto(key) {
  return getFetch(STATION_AUTO_API + '/station-auto/' + key)
}

export function createStationAuto(measuring = {}) {
  return postFetch(STATION_AUTO_API + '/station-auto', measuring)
}

export function updateStationAuto(key, measuring = {}) {
  return putFetch(STATION_AUTO_API + '/station-auto/' + key, measuring)
}

export function deleteStationAuto(key) {
  return deleteFetch(STATION_AUTO_API + '/station-auto/' + key)
}

export default {
  getStationAutos,
  getStationAuto,
  createStationAuto,
  updateStationAuto,
  deleteStationAuto
}
