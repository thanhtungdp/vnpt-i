import { ADMIN_API } from '../config'
import { getFetch, postFetch, putFetch, deleteFetch } from 'utils/fetch'

function getUrl(path = '') {
  return ADMIN_API + '/' + path
}

export function getGallerySliders({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    getUrl(`gallery-sliders/?itemPerPage=${itemPerPage}&page=${page}`)
  )
}

export function getGallerySlider(_id) {
  return getFetch(getUrl(`gallery-sliders/${_id}`))
}

export function createGallerySlider(data) {
  return postFetch(getUrl(`gallery-sliders`), data)
}

export function updateGallerySlider(_id, data) {
  return putFetch(getUrl(`gallery-sliders/${_id}`), data)
}

export function deleteGallerySlider(_id) {
  return deleteFetch(getUrl(`gallery-sliders/${_id}`))
}

// export function updateStatusType(quizListId, statusType) {
//   return putFetch(getUrl(`quiz-lists/status-type/${quizListId}`), {
//     statusType: statusType
//   })
// }

export default {
  getGallerySliders,
  getGallerySlider,
  createGallerySlider,
  updateGallerySlider,
  deleteGallerySlider
  // updateStatusType
}
