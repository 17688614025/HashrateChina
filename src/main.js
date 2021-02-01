// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import { socketApi } from '@/utils/api'
// import VueSocketIO from 'vue-socket.io'
import Vue from 'vue'
// socketApi().then(res => {
// console.log(res);
// Vue.use(new VueSocketIO({
// debug: true,
// connection: 'https://filfox.info/api/v1/' + res[0]
// connection: 'https://filfox.info/api/v1/'
// connection: 'http://127.0.0.1:3000'
// }))
// })
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import less from 'less'
import BaiduMap from 'vue-baidu-map'
import store from './store'
import messages from '@/assets/langs/index'
import 'normalize.css' // 初始化样式
import echarts from 'echarts'
// 引入makrdown插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'babel-polyfill'
Vue.use(mavonEditor)
Vue.prototype.$echarts = echarts
Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: window.localStorage.getItem('language') || 'zh', // set locale
  messages, // set locale messages
  fallbackLocale: 'zh', // 如果在message中找不到相应的键值将回退到原本的语言
  formatFallbackMessages: true // 如果在message中找不到相应的键值将回退到原本的语言
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key
  ak: 'ZHAO_YUN'
})
Vue.use(less)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
