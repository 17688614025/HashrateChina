import Vue from 'vue'

import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'
import store from './store'
import messages from '@/assets/langs/index'
import 'normalize.css' // 初始化样式
// 引入makrdown插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'babel-polyfill'
Vue.use(mavonEditor)
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
