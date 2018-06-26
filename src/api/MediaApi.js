import { getConfigApi } from 'config'

function getMediaUrl(prefix = '') {
  return getConfigApi().media + '/' + prefix
}

export function urlPhotoUploadWithDirectory(directory) {
  return getMediaUrl(`photo/uploadWithDirectory/${directory}`)
}

export default {
  urlPhotoUploadWithDirectory
}
