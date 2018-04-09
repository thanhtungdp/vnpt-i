import { getFetch } from 'utils/fetch'

const urlNotification = `http://localhost:5001/fcm-messages`

export function getNotification() {
  let urlSearch = `${urlNotification}`
  return getFetch(urlSearch)
}

export default {
  getNotification
}
