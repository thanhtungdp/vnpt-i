import { STATION_API } from 'config'
import { getFetch, postFetch, deleteFetch, putFetch } from 'utils/fetch'

function getUrl(path) {
  return STATION_API + '/' + path
}

//API of Station Burial
export function getStationBurials({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    getUrl(`stations-burial?itemPerPage=${itemPerPage}&page=${page}`)
  )
}

//get One Reocord
export function getStationBurial(_id) {
  return getFetch(getUrl(`stations-burial/${_id}`))
}

export function postStationBurial(stationBurial = {}) {
  return postFetch(getUrl('stations-burial'), stationBurial)
}
export function deleteStationBurial(_id) {
  return deleteFetch(getUrl(`stations-burial/${_id}`))
}

export function putStationBurial(_id, data) {
  return putFetch(getUrl(`stations-burial/${_id}`), data)
}

//API of Station Transits
export function getStationTransits({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    getUrl(`stations-transit?itemPerPage=${itemPerPage}&page=${page}`)
  )
}

export default {
  getStationBurials,
  getStationBurial,
  postStationBurial,
  putStationBurial,
  deleteStationBurial,
  getStationTransits
}
