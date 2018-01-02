import StationTransitsData from 'fake-data/stationsBurial'
import { STATION_API } from 'config'
import { getFetch, postFetch, deleteFetch, putFetch } from 'utils/fetch'

function getUrl(path) {
  return STATION_API + '/' + path
}

export function getStationTransits({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    getUrl(`stations-transit?itemPerPage=${itemPerPage}&page=${page}`)
  )
}

//get One Reocord
export function getStationTransit(_id) {
  return getFetch(getUrl(`stations-transit/${_id}`))
}

export function postStationTransit(StationTransit = {}) {
  return postFetch(getUrl('stations-transit'), StationTransit)
}
export function deleteStationTransit(_id) {
  return deleteFetch(getUrl(`stations-transit/${_id}`))
}

export function putStationTransit(_id, data) {
  return putFetch(getUrl(`stations-transit/${_id}`), data)
}

export default {
  getStationTransits,
  getStationTransit,
  postStationTransit,
  deleteStationTransit,
  putStationTransit
}
