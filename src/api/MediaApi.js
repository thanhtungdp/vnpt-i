import { MEDIA_API } from 'config'
import { postFetch } from 'utils/fetch'

export function uploadPhoto(data) {
  return postFetch(MEDIA_API + '/photo/upload', data, {
    dataType: 'formdata'
  })
}

export default {
  uploadPhoto
}
