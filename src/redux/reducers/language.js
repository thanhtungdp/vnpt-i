// redux/reducers/language.js

import update from 'react-addons-update'
import { CHANGE_LANGUAGE } from '../actions/languageAction'
import languages from 'languages'

const initialState = {
  locale: 'en',
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
