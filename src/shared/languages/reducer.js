import update from 'react-addons-update'
import { CHANGE_LANGUAGE } from './action'

const initialState = {
  locale: 'en',
  data: {
    en: {},
    vi: {}
  }
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return changeLanguage(state, action)
    default:
      return state
  }
}

export function changeLanguage(state, { locale }) {
  return update(state, {
    locale: {
      $set: locale
    }
  })
}
