import { getFetch } from 'utils/fetch'

const urlNotification = `http://192.168.252.121:5000/fcm-messages`

export function getNotification() {
  let urlSearch = `${urlNotification}`
  return getFetch(urlSearch)
}

export default {
  getNotification
}
