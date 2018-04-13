const LANGUAGE = 'language'

export function setLanguage(locacle) {
  localStorage.setItem(LANGUAGE,locacle)
}

export function getLanguage() {
  return localStorage.getItem(LANGUAGE) ? localStorage.getItem(LANGUAGE) : 'en'
}