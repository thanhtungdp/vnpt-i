import { getConfigApi } from 'config'
import { getFetch } from 'utils/fetch'

function getDataStationAutoUrl(prefix = '') {
  return getConfigApi().dataStationAuto + '/' + prefix
}

export function getDataStationAutos(
  { page = 1, itemPerPage = 10 },
  { fromDate, toDate, key, advanced, measuringList, isExceeded }
) {
  var url = `${getDataStationAutoUrl(
    `${key}?page=${page}&itemPerPage=${itemPerPage}`
  )}`
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
  if (advanced) url += `&advanced=${JSON.stringify(advanced)}`
  if (measuringList) url += `&measuringList=${measuringList.join(',')}`
  if (isExceeded) url += `&isExceeded=${isExceeded}`
  return getFetch(url)
}

export function getExportData({
  fromDate,
  toDate,
  key,
  advanced,
  measuringList,
  isExceeded
}) {
  var url = getDataStationAutoUrl(`${key}/export-download?`)
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
  if (advanced) url += `&advanced=${JSON.stringify(advanced)}`
  if (measuringList) url += `&measuringList=${measuringList.join(',')}`
  if (isExceeded) url += `&isExceeded=${isExceeded}`
  return getFetch(url)
  //window.location = url
}

export function getDataStationAutoAvg(
  { page = 1, itemPerPage = 10 },
  { fromDate, toDate, key, measuringList, type }
) {
  var url = getDataStationAutoUrl(
    `${key}/avg?page=${page}&itemPerPage=${itemPerPage}`
  )
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
  if (measuringList) url += `&measuringList=${measuringList.join(',')}`
  if (type) url += `&type=${type}`
  return getFetch(url)
}

export function getDataStationAutoExportAvg({
  fromDate,
  toDate,
  key,
  measuringList,
  type
}) {
  var url = getDataStationAutoUrl(`${key}/export-avg?`)
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
  if (measuringList) url += `&measuringList=${measuringList.join(',')}`
  if (type) url += `&type=${type}`
  return getFetch(url)
}

export function getDataAnalyzeStationAutos({
  fromDate,
  toDate,
  key,
  advanced,
  measuringList,
  isExceeded
}) {
  var url = getDataStationAutoUrl(`${key}/analyze?`)
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
  if (advanced) url += `&advanced=${JSON.stringify(advanced)}`
  if (measuringList) url += `&measuringList=${measuringList.join(',')}`
  if (isExceeded) url += `&isExceeded=${isExceeded}`
  return getFetch(url)
}

export default {
  getDataStationAutos,
  getExportData,
  getDataStationAutoAvg,
  getDataStationAutoExportAvg,
  getDataAnalyzeStationAutos
}
