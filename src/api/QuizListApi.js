import { ADMIN_API } from '../config'
import { getFetch, putFetch } from 'utils/fetch'

function getUrl(path = '') {
  return ADMIN_API + '/' + path
}

export function getQuizLists({ itemPerPage = 10, page = 1 }) {
  return getFetch(getUrl(`quiz-lists/?itemPerPage=${itemPerPage}&page=${page}`))
}

export function updateStatusType(quizListId, statusType) {
  return putFetch(getUrl(`quiz-lists/status-type/${quizListId}`), {
    statusType: statusType
  })
}

export default {
  getQuizLists,
  updateStatusType
}
