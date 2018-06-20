import { FTP_API } from '../config'
import { getFetch, postFetch } from '../utils/fetch'

export function getFtpFiles(
  { page = 1, itemPerPage = 10 },
  { path, isFullPath } = {}
) {
  var url = `${FTP_API}/ftp/explorer?page=${page}&itemPerPage=${itemPerPage}`
  if (isFullPath) url += `&isFullPath=true`
  if (path) url += `&path=${encodeURIComponent(path)}`
  return getFetch(url)
}

export function getContentFtpFiles(path) {
  var url = `${FTP_API}/ftp/readFile?path=${encodeURIComponent(path)}`
  return getFetch(url)
}

export function getInfoByPath(path) {
  var url = `${FTP_API}/ftp?path=${encodeURIComponent(path)}`
  return getFetch(url)
}

//ftpPath= {path: String}
export function createFTPFolder(ftpPath = {}) {
  var url = `${FTP_API}/ftp`
  return postFetch(url, ftpPath)
}

export default {
  getFtpFiles,
  getContentFtpFiles,
  getInfoByPath,
  createFTPFolder
}
