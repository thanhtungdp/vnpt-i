import { MENU_API } from '../config'
import { getFetch } from '../utils/fetch'

export function getMenus() {
  return getFetch(MENU_API)
}

export default {
  getMenus
}
