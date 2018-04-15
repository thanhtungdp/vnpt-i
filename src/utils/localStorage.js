const LANGUAGE = 'language'
const IS_OPEN_NAVIGATION = 'isOpenNavigation'
const MONITORING_FILTER = 'monitoringFilter'

export function setLanguage(locacle) {
  localStorage.setItem(LANGUAGE, locacle)
}

export function getLanguage() {
  return localStorage.getItem(LANGUAGE) ? localStorage.getItem(LANGUAGE) : 'en'
}

export function setToggleNavigation(isOpen) {
  localStorage.setItem(IS_OPEN_NAVIGATION, isOpen.toString())
}

export function getToggleNavigation() {
  const isOpenNavigation = localStorage.getItem(IS_OPEN_NAVIGATION)
  if (isOpenNavigation === null) return true
  return isOpenNavigation === 'true' ? true : false
}

export function setMonitoringFilter(filter) {
  localStorage.setItem(MONITORING_FILTER, JSON.stringify(filter))
}

export function getMonitoringFilter() {
  const sFilter = localStorage.getItem(MONITORING_FILTER)
  return sFilter ? JSON.parse(sFilter) : null
}
