import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://filfox.info/api/v1/'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'https://www.ceshi.com'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://www.production.com'
}

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
// 创建axios实例：service
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置默认的URL前缀
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // 设置请求超时。如果超过了60秒，就会告知用户当前请求超时，请刷新等
})
service.setToken = (token) => {
  service.defaults.headers['Authorization'] = 'Bearer ' + token

  window.localStorage.setItem('Admin-Token', token)
}
// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 每次请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header上都加上token，以便后台根据token判断当前登陆情况
    // 即使本地存在token，也有可能过期，所以需要对返回状态进行判断
    const token = store.getters.token
    if (token && config.headers.Authorization === token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }

    if (['post', 'put', 'delete'].includes(config.method) && typeof config.data === 'object') {
      config.data = Object.keys(config.data).map(key => `${key}=${config.data[key]}`).join('&')
      config.data = encodeURI(config.data) // 解决参数中包含特殊字符无法保存的问题
      // 设置请求头
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
/* 重新获取新的token*/
function refreshToken() {
  // service是当前request.js中已创建的axios实例
  return axios({
    method: 'post',
    url: 'api-auth/oauth/token',
    params: {
      client_id: 'webApp',
      client_secret: 'webApp',
      refresh_token: localStorage.getItem('refresh_token'),
      grant_type: 'refresh_token'
    }
  }).then(res => res)
}
// 响应拦截器
// 在我们拿到服务器返回给我们的数据之前进行一些处理
// 主要就是进行错误的统一处理和没登录 登录过期后调整登录页的一个操作
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code.
   */
  response => {
    // const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: response.message || 'error',
        type: 'error',
        duration: 60 * 1000,
        showClose: true
      })

      // 具体状态码需要根据项目中的实际约定的错误状态吗进行判断
      // 根据返回的状态吗进行一些操作，诸如 登录过期 错误提示 长时间停留失效等
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (response.status === 50008 || response.status === 50012 || response.status === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(response.message || 'error')
    } else {
      // 正常拿到数据
      return response.data
    }
  },
  error => {
    let message = error.message
    if (error.response && error.response.data && error.response.data['resp_code']) { // 登录提示
      message = error.response.data['rsp_msg'] || error.response.data['resp_msg']
    }
    console.log('err' + error) // for debug

    if (error.response && error.response.data && error.response.data['resp_code'] && error.response.data['resp_msg']) {
      if (error.response.data['resp_code'] === '401' && error.response.data['resp_msg'].startsWith('Invalid access token')) {
        /* 401超时*/
        const config = error.response.config
        if (!isRefreshing) {
          isRefreshing = true
          return refreshToken().then(res => {
            const token = res.data.access_token
            service.setToken(token)
            config.headers['Authorization'] = 'Bearer ' + token
            config.baseURL = ''
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(token))
            requests = []
            return service(config) // 重新执行当前的接口
          }).catch(res => {
            const message = '会话超时，请重新登录'
            store.dispatch('user/logout')
            router.push({ path: `/login?redirect=${message}`, params: { errorMessage: message }})
          }).finally(() => {
            isRefreshing = false
          })
        } else {
          // 正在刷新token，将返回一个未执行resolve的promise
          return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push((token) => {
              config.baseURL = ''
              config.headers['Authorization'] = 'Bearer ' + token
              resolve(service(config))
            })
          })
        }
      } else {
        Message({
          dangerouslyUseHTMLString: true,
          message: error.response.data['resp_msg'],
          type: 'error',
          duration: 5 * 1000,
          showClose: true
        })
      }
    } else {
      Message({
        dangerouslyUseHTMLString: true,
        message: `${message}${error.response && error.response.data && error.response.data.message ? '' + error.response.data.message : ''}`,
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
    }

    return Promise.reject(error)
  }
)

export default service
