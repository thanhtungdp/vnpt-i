// redux/reducers/lang.js
import {setLanguage} from 'utils/localStorage'

export const CHANGE_LANGUAGE = 'LANGUAGE/change-language'

export function changeLanguage(locale = 'en') {
  setLanguage(locale)
  return {
    type: CHANGE_LANGUAGE,
    locale
  }
}
