import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import createLogger from 'vuex/dist/logger' // vuex调试工具
import createPersistedState from 'vuex-persistedstate' // 数据状态持久化
Vue.use(Vuex)

// 开发环境下开启严格模式
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user
  },
  state,
  getters,
  mutations,
  actions,
  plugins: debug ? [
    createPersistedState({
      storage: window.sessionStorage
    }),
    createLogger()
  ] : []
})
// Vue.set(state,"age",15)
// Vue.delete(state,'age')

export default store
