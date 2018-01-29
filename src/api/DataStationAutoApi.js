import { DATA_STATION_AUTO_API } from '../config'
import { getFetch } from '../utils/fetch'

export function getDataStationAutos(
  { page = 1, itemPerPage = 10 },
  { fromDate, toDate, key }
) {
  var url = `${DATA_STATION_AUTO_API}/data-station-auto/${key}?page=${page}&itemPerPage=${itemPerPage}`
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
  return getFetch(url)
}

export default {
  getDataStationAutos
}
