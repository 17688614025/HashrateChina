import axios from 'axios'

/**
 * axios 处理并发请求的助手函数
 */
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://192.168.31.128:8098/'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'https://filfox.info/api/v1/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://filfox.info/api/v1/'
}

axios.interceptors.request.use(
  config => {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function(response) {
    // 可以写判断获得的数据返回码
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)
// 请求超时时间
axios.defaults.timeout = 60000

export default axios
