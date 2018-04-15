// redux/reducers/language.js

import update from 'react-addons-update'
import { CHANGE_LANGUAGE } from '../actions/languageAction'
import languages from 'languages'
import { getLanguage } from 'utils/localStorage'

const initialState = {
  locale: getLanguage(),
  data: languages
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
