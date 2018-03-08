import { MEDIA_API } from '../config'

export const urlMedia = MEDIA_API + '/photo'
export const urlPhotoUpload = urlMedia + '/upload'
const urlPhotoUploadDirectory = urlMedia + '/uploadWithDirectory'

export function urlPhotoUploadWithDirectory(directory) {
  return urlPhotoUploadDirectory + '/' + directory
}

export default {
  urlPhotoUpload,
  urlPhotoUploadWithDirectory
}
