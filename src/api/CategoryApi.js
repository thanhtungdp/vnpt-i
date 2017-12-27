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
export function getCategory(code) {
  return getFetch(getUrl(code))
}

export function updateCategory(code, categoryData) {
  return putFetch(getUrl(code), categoryData)
}

export function deleteCategory(code) {
  return deleteFetch(getUrl(code))
}

export default {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
}
