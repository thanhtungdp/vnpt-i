import { getConfigApi } from 'config'
import { deleteFetch, getFetch, postFetch, putFetch } from 'utils/fetch'

export function getMeasuringUrl(prefix = '') {
  return getConfigApi().measuring + '/' + prefix
}

export function getStationTypeUrl(prefix = '') {
  return getConfigApi().stationType + '/' + prefix
}

export function getMeasurings(
  { page = 1, itemPerPage = 10 },
  { unit = null, name = null }
) {
  var urlSearch = `${getMeasuringUrl()}?page=${page}&itemPerPage=${itemPerPage}`
  if (unit) urlSearch += `&unit=${unit}`
  if (name) urlSearch += `&name=${name}`
  return getFetch(urlSearch)
}

export function getMeasuring(key) {
  return getFetch(getMeasuringUrl(key))
}

export function createMeasuring(measuring = {}) {
  return postFetch(getMeasuringUrl(), measuring)
}

export function updateMeasuring(key, measuring = {}) {
  return putFetch(getMeasuringUrl(key), measuring)
}

export function deleteMeasuring(key) {
  return deleteFetch(getMeasuringUrl(key))
}

export function getStationTypes(
  { page = 1, itemPerPage = 10 },
  { key = null, name = null } = {}
) {
  var urlSearch = `${getStationTypeUrl()}?page=${page}&itemPerPage=${itemPerPage}`
  if (key) urlSearch += `&key=${key}`
  if (name) urlSearch += `&name=${name}`
  return getFetch(urlSearch)
}

export function getStationType(key) {
  return getFetch(getStationTypeUrl(key))
}

export function createStationType(measuring = {}) {
  return postFetch(getStationTypeUrl(), measuring)
}

export function updateStationType(key, measuring = {}) {
  return putFetch(getStationTypeUrl(key), measuring)
}

export function deleteStationType(key) {
  return deleteFetch(getStationTypeUrl(key))
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
