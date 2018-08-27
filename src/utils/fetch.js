import axios from 'axios'
import { getAuthToken } from './auth'

const getHeaders = () => {
  var headers = {
    Accept: 'application/json'
  }
  if (typeof localStorage !== 'undefined') {
    if (getAuthToken()) {
      headers = {
        ...headers,
        Authorization: getAuthToken(true)
      }
    }
  }
  return headers
}

export function postFetch(url, data, props) {
  let attributes = Object.assign(
    {
      cache: true,
      headers: getHeaders()
    },
    props
  )

  return new Promise((resolve, reject) => {
    axios
      .post(url, data, attributes)
      .then(res => {
        // if (res.status === 200) {
        resolve(res.data)
        // } else {
        //   reject({ error: true })
        // }
      })
      .catch(e => reject(e))
  })
}

export function putFetch(url, data, props) {
  let attributes = Object.assign(
    {
      cache: true,
      headers: getHeaders()
    },
    props
  )

  return new Promise((resolve, reject) => {
    axios
      .put(url, data, attributes)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject({ error: true })
        }
      })
      .catch(e => reject(e))
  })
}

export function getFetch(url, data, props) {
  let attributes = Object.assign(
    {
      headers: getHeaders()
    },
    props
  )
  return new Promise((resolve, reject) => {
    axios
      .get(url, attributes)
      .then(res => {
        // if (res.status === 200) {
        resolve(res.data)
        // } else {
        //   reject({ error: true })
        // }
      })
      .catch(e => reject(e))
  })
}

export function deleteFetch(url, data, props) {
  let attributes = Object.assign(
    {
      headers: getHeaders()
    },
    props
  )
  return new Promise((resolve, reject) => {
    axios
      .delete(url, attributes)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject({ error: true })
        }
      })
      .catch(e => reject(e))
  })
}

export function uploadMultipleFile(url, files){
  let params = new FormData()
  files.forEach(file => {
    params.append("files", file)
  })

  return new Promise((resolve, reject) => {
      axios
      .create({
        timeout: 10000
      })
      .post(url, params)
      .then(result => {
        if (result && result.data) {
          resolve(result.data)
        } else {
          reject({ error: true })
        }
      })
      .catch(err => reject({ error: true, message: err.message }))
  })
}
