const user = {
  state: {
    self: null,
    token: ''
  },
  mutations: {
    SET_SELF: (state, self) => {
      state.self = self
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    login({ commit }, res) {
      commit('SET_SELF', res.self)
      commit('SET_TOKEN', res.token)
    }
  }
}
export default user
