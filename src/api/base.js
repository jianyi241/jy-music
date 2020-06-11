import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

// 请求拦截
axios.interceptors.request.use(conf => {
  return Promise.resolve(conf)
}, err => {
  return Promise.reject(err)
})

// 响应拦截
axios.interceptors.response.use(res => {
//   if (res.status === 2000) {
  return Promise.resolve(res)
//   } else {
//     return Promise.reject(res)
//   }
}, err => {
  if (err.response.status) {
    let errText = ''
    switch (err.response.status) {
      case 401:
        errText = '身份验证失败，请关闭重新进入'
        break
      case 403:
        errText = '登录过期，请关闭重新进入'
        // 清除token
        break
        // 404请求不存在
      case 404:
        errText = '您访问的网页不存在'
        break
        // 500 请求服务器错误
      case 500:
        errText = '请求服务器错误'
        break
        // 其他错误，直接抛出错误提示
      default:
        errText = '其他错误'
    }
    console.log('响应错误', errText)
  }
  return Promise.reject(err)
})

export default axios
