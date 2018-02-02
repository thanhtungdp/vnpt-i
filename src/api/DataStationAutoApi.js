import { DATA_STATION_AUTO_API } from '../config'
import { getFetch } from '../utils/fetch'

export function getDataStationAutos(
  { page = 1, itemPerPage = 10 },
  { fromDate, toDate, key, advanced, measuringArray, isExceeded }
) {
  var url = `${DATA_STATION_AUTO_API}/data-station-auto/${key}?page=${page}&itemPerPage=${itemPerPage}`
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
  if (advanced) url += `&advanced=${JSON.stringify(advanced)}`
    if (measuringArray) url += `&measuringList=${measuringArray.join(',')}`
  if (isExceeded) url += `&isExceeded=${isExceeded}`
  return getFetch(url)
}

export function getExportData({
  fromDate,
  toDate,
  key,
  advanced,
  measuringArray,
  isExceeded
}) {
  var url = `${DATA_STATION_AUTO_API}/data-station-auto/${key}/export-download?`
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
  if (advanced) url += `&advanced=${JSON.stringify(advanced)}`
  if (measuringArray) url += `&measuringList=${JSON.stringify(measuringArray)}`
  if (isExceeded) url += `&isExceeded=${isExceeded}`
  window.location = url
}

export function getDataStationAutoAVg(
  { page = 1, itemPerPage = 10 },
  { fromDate, toDate, key, measuringArray, type }
) {
  var url = `${DATA_STATION_AUTO_API}/data-station-auto/${key}/avg?page=${page}&itemPerPage=${itemPerPage}`
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
    if (measuringArray) url += `&measuringList=${measuringArray.join(',')}`
  if (type) url += `&type=${type}`
  return getFetch(url)
}

export function getDataStationAutoExportAVg({
  fromDate,
  toDate,
  key,
  measuringArray,
  type
}) {
  var url = `${DATA_STATION_AUTO_API}/data-station-auto/${key}/export-avg?`
  if (fromDate) url += `&from=${fromDate}`
  if (toDate) url += `&to=${toDate}`
    if (measuringArray) url += `&measuringList=${measuringArray.join(',')}`
  if (type) url += `&type=${type}`
  window.location = url
}

export default {
  getDataStationAutos,
  getExportData,
  getDataStationAutoAVg,
  getDataStationAutoExportAVg
}
