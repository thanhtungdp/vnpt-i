import { TOGGLE_NAVIGATION } from '../actions/themeAction'
import update from 'react-addons-update'
import { setToggleNavigation, getToggleNavigation } from 'utils/localStorage'

const initialState = {
  navigation: {
    isOpen: getToggleNavigation()
  }
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAVIGATION:
      setToggleNavigation(action.isOpen)
      return update(state, {
        navigation: {
          isOpen: {
            $set: action.isOpen
          }
        }
      })
    default:
      return state
  }
}
