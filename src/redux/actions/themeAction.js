export const TOGGLE_NAVIGATION = 'THEME/toggle-navigation'

export function toggleNavigation(isOpen) {
  return {
    type: TOGGLE_NAVIGATION,
    isOpen
  }
}
