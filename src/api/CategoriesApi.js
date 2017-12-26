import { postFetch, getFetch } from 'utils/fetch'
import { CATELOGIRES_API } from 'config'
import {putFetch} from "../utils/fetch";

export function getCategories({ itemPerPage = 10, page = 1 }) {
  return getFetch(
    CATELOGIRES_API + '/categories?itemPerPage=' + itemPerPage + '&page=' + page
  )
}

export function postCategories(record) {
  return postFetch(CATELOGIRES_API + '/categories', record)
}

//get one record
export function getCategory(code) {
  return getFetch(CATELOGIRES_API + '/categories/' + code)
}

export function putCategories(record, code) {
  return putFetch(CATELOGIRES_API + '/categories/' + code, record)
}

export default {
  getCategories,
  postCategories,
  getCategory,
  putCategories
}
