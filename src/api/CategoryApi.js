import { postFetch, getFetch, deleteFetch, putFetch } from 'utils/fetch'
import { CATEGORY_API } from 'config'

function getUrl(path = '') {
  return CATEGORY_API + '/categories/' + path
}

export function getCategories({ itemPerPage = 10, page = 1 }) {
  return getFetch(getUrl(`?itemPerPage=${itemPerPage}&page=${page}`))
}

export function createCategory(categoryData = {}) {
  return postFetch(getUrl(), categoryData)
}

//get one record
export function getCategory(_id) {
  return getFetch(getUrl(_id))
}

export function updateCategory(_id, categoryData) {
  return putFetch(getUrl(_id), categoryData)
}

export function deleteCategory(_id) {
  return deleteFetch(getUrl(_id))
}

export default {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
}
