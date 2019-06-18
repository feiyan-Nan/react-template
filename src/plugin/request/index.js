import axios from 'axios'

import {message} from "antd";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:6060',  //api的base_url
  timeout: 20000, //请求超时时间
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const request = {}

const methods = [
  {
    mKey: 'get',
    pKey: 'params'
  },
  {
    mKey: 'post',
    pKey: 'data'
  },
  {
    mKey: 'put',
    pKey: 'data'
  },
  {
    mKey: 'delete',
    pKey: 'data'
  }
]

methods.forEach(method => {
  request[method.mKey] = (url, params) => {
    return instance({ method: method.mKey, url, [method.pKey]: params })
  }
})

// 拦截请求
instance.interceptors.request.use(
  config => {
    Object.assign(config.headers, {
      // 这里可以给请求头添加参数
      'deviceType': 'web',  //标示设备
      // 'Content-Type': 'application/x-www-form-urlencoded'
    })
    return config
  },
  error => {
    message.error('bed request')
    Promise.reject(error)
  }
)

let timer
//拦截响应
instance.interceptors.response.use(
  response => {
    console.log(response)
    if (response.data.code === 401 && response.data.message) message.warning(response.data.message)
    return response.data
  },
  err => {
    console.log(err)
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            message.error('错误请求')
            break
          case 401:
            localStorage.clear()
            message.error('登录信息过期或未授权，请重新登录！')
            break
          case 403:
            message.error('拒绝访问！')
            break
          case 404:
            message.error('请求错误,未找到该资源！')
            break
          case 500:
            message.err('服务器出问题了，请稍后再试！')
            break
          default:
            message.err(`连接错误 ${err.response.status}！`)
            break
        }
      } else {
        message.error('服务器出了点小问题，请稍后再试！')
      }
    }, 200) // 200 毫秒内重复报错则只提示一次！
    return Promise.reject(err)
  }
)

export default request
