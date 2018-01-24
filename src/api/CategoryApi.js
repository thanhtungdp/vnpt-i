import { CATEGORY_API } from '../config'
import { deleteFetch, getFetch, postFetch, putFetch } from '../utils/fetch'

const urlMeasuring = CATEGORY_API + '/measuring/'

export function getMeasurings({ page = 1, itemPerPage = 10 }, { unit, name }) {
  var urlSearch = `${urlMeasuring}?page=${page}&itemPerPage=${itemPerPage}`
  if (unit) urlSearch += `&unit=${unit}`
  if (name) urlSearch += `&name=${name}`
  return getFetch(urlSearch)
}

export function getMeasuring(key) {
  return getFetch(urlMeasuring + key)
}

export function createMeasuring(measuring = {}) {
  return postFetch(urlMeasuring, measuring)
}

export function updateMeasuring(key, measuring = {}) {
  return putFetch(urlMeasuring + key, measuring)
}

export function deleteMeasuring(key) {
  return deleteFetch(urlMeasuring + key)
}

const urlStationType = CATEGORY_API + '/station-type/'

export function getStationTypes({ page = 1, itemPerPage = 10 }, { key, name }) {
  var urlSearch = `${urlStationType}?page=${page}&itemPerPage=${itemPerPage}`
  if (key) urlSearch += `&key=${key}`
  if (name) urlSearch += `&name=${name}`
  return getFetch(urlSearch)
}

export function getStationType(key) {
  return getFetch(urlStationType + key)
}

export function createStationType(measuring = {}) {
  return postFetch(urlStationType, measuring)
}

export function updateStationType(key, measuring = {}) {
  return putFetch(urlStationType + key, measuring)
}

export function deleteStationType(key) {
  return deleteFetch(urlStationType + key)
}

export default {
  getMeasurings,
  getMeasuring,
  createMeasuring,
  updateMeasuring,
  deleteMeasuring,
  getStationTypes,
  getStationType,
  createStationType,
  updateStationType,
  deleteStationType
}
