import update from 'react-addons-update'
import { GET_STATION_BURIALS } from '../actions/stationBurialAction'

const initialState = {
  list: {
    data: [],
    pagination: {}
  },
  current: {}
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATION_BURIALS:
      return getStationBurials(state, action)
    default:
      return state
  }
}

function getStationBurials(state, { payload: { getStationBurials } }) {
  return update(state, {
    list: {
      data: {
        $set: getStationBurials.data
      },
      pagination: {
        $set: getStationBurials.pagination
      }
    }
  })
}
