export const CHANGE_LANGUAGE = 'LANGUAGE/change-language'

export function changeLanguage(locale = 'en') {
  return {
    type: CHANGE_LANGUAGE,
    locale
  }
}
