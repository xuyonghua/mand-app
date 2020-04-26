import axios from 'axios'
import { Toast } from 'mand-mobile'

axios.interceptors.request.use(config => {
  return config
}, err => {
  console.error(err)
  Toast.failed('Request timeout!')
})
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 500) {
    Toast.succeed(data.data.msg)
    return
  }
  if (data.status && data.status === 200 && data.data.status === 300) {
    Toast.succeed(data.data.msg)
    return
  }
  if (data.data.msg) {
    Toast(data.data.msg)
  }
  return data
}, err => {
  if (err.response.status === 504) {
    Toast.failed('Unable to connect to server∥⊙﹏⊙∥')
  } else if (err.response.status === 404) {
    Toast.failed('Page not found')
  } else if (err.response.status === 403) {
    Toast.failed('Permission denied, Please contact administrator!')
  } else if (err.response.status === 401) {
    Toast.failed(err.response.data.msg)
  } else {
    if (err.response.data.msg) {
      Toast.info(err.response.data.msg)
    } else {
      Toast.failed('Unknown error or System error!')
    }
  }
  // return Promise.resolve(err);
})
const base = '/api'
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const postJsonRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}
