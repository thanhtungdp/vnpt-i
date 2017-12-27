import stationBurialsData from 'fake-data/stationsBurial'
import { STATION_API } from 'config'
import { getFetch } from 'utils/fetch'

function getUrl(path) {
  return STATION_API + '/' + path
}

export function getStationBurials({ itemPerPage = 10, page = 1 }) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: stationBurialsData(itemPerPage),
        pagination: {
          page: page,
          itemPerPage: itemPerPage,
          totalItem: 30
        }
      })
    }, 300)
  })
}

export function getStationTransits({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    getUrl(`stations-transit?itemPerPage=${itemPerPage}&page=${page}`)
  )
}

export default {
  getStationBurials,
  getStationTransits
}
