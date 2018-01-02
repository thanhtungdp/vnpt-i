import stationBurialsData from 'fake-data/stationsBurial'
import { STATION_API } from 'config'
import { getFetch } from 'utils/fetch'


function getUrl(path) {
  return STATION_API + '/' + path
}

export function getStationTransits({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    getUrl(`stations-transit?itemPerPage=${itemPerPage}&page=${page}`)
  )
}

//get One Reocord
export function getStationTransit(_id){
  return getFetch(
    getUrl(`stations-transit/${_id}`)
  )
}


export default {
  getStationTransits,
  getStationTransit
}
