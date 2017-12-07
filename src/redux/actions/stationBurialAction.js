import ManagerApi from 'api/ManagerApi'
import { AWAIT_MARKER } from 'redux-await'

export const GET_STATION_BURIALS = 'STATION-BURIALS/get-lists'

export function getStationBurials({ page = 1, itemPerPage = 20 }) {
  return {
    type: GET_STATION_BURIALS,
    AWAIT_MARKER,
    payload: {
      getStationBurials: ManagerApi.getStationBurials({ page, itemPerPage })
    }
  }
}

