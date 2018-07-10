import { getConfigApi } from 'config'
import { getFetch, postFetch } from 'utils/fetch'

function getFtpUrl(prefix = '') {
  return getConfigApi().ftp + '/' + prefix
}

export function getFtpFiles(
  { page = 1, itemPerPage = 10 },
  { path, isFullPath } = {}
) {
  var url = getFtpUrl(`explorer?page=${page}&itemPerPage=${itemPerPage}`)
  if (isFullPath) url += `&isFullPath=true`
  if (path) url += `&path=${encodeURIComponent(path)}`
  return getFetch(url)
}

export function getContentFtpFiles(path) {
  return getFetch(getFtpUrl(`readFile?path=${encodeURIComponent(path)}`))
}

export function getInfoByPath(path) {
  return getFetch(getFtpUrl(`?path=${encodeURIComponent(path)}`))
}

//ftpPath= {path: String}
export function createFTPFolder(ftpPath = {}) {
  return postFetch(getFtpUrl(), ftpPath)
}

export function readFileTheMostRecent(fileName, path) {
  return getFetch(
    getFtpUrl(
      `readFileTheMostRecent?fileName=${fileName}&path=${encodeURIComponent(
        path
      )}`
    )
  )
}

export default {
  getFtpFiles,
  getContentFtpFiles,
  getInfoByPath,
  createFTPFolder,
  readFileTheMostRecent
}
