import { STATION_API } from 'config'
import { getFetch, postFetch, deleteFetch, putFetch } from 'utils/fetch'

function getUrl(path) {
  return STATION_API + '/' + path
}

/* API lấy trạm theo loại */
export function getStationWithType(type, { itemPerPage = 1000, page = 1 }) {
  console.log(type, itemPerPage, page)
  if (type === 'appointment') {
    return getFetch(
      getUrl(`stations-appointment?itemPerPage=${itemPerPage}&page=${page}`)
    )
  } else if (type === 'transit') {
    return getFetch(
      getUrl(`stations-transit?itemPerPage=${itemPerPage}&page=${page}`)
    )
  } else if (type === 'burial') {
    return getFetch(
      getUrl(`stations-burial?itemPerPage=${itemPerPage}&page=${page}`)
    )
  }
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

export function getStationAppointments({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    getUrl(`stations-appointment?itemPerPage=${itemPerPage}&page=${page}`)
  )
}

//get One Reocord
export function getStationAppointment(_id) {
  return getFetch(getUrl(`stations-appointment/${_id}`))
}

export function postStationAppointment(StationAppointment = {}) {
  return postFetch(getUrl('stations-appointment'), StationAppointment)
}
export function deleteStationAppointment(_id) {
  return deleteFetch(getUrl(`stations-appointment/${_id}`))
}

export function putStationAppointment(_id, data) {
  return putFetch(getUrl(`stations-appointment/${_id}`), data)
}

export default {
  getStationBurials,
  getStationBurial,
  postStationBurial,
  putStationBurial,
  deleteStationBurial,
  getStationTransits,
  getStationTransit,
  postStationTransit,
  deleteStationTransit,
  putStationTransit,
  getStationAppointments,
  getStationAppointment,
  postStationAppointment,
  deleteStationAppointment,
  putStationAppointment,
  getStationWithType
}
