const mutations = {
  // es6语法，等同edit:funcion(){...}
  edit(state) {
    state.name = 'jack'
    // this.$store.commit('edit')
    // this.$store.commit('edit',15)
    // this.$store.commit('edit',{age:15,sex:'男'})
  },
  SET_USER: (state, userId) => {
    state.userId = userId
  },
  SET_TOKEN: (state, token) => {
    // console.log(token)
    state.token = token
  },
  isScreenPhone: (state, flag) => {
    state.isScreenPhone = flag
  }
  // edit(state,payload){
  //     state.name = 'jack'
  //     console.log(payload) // 15或{age:15,sex:'男'}
  // }

  // this.$store.commit({
  //     type:'edit',
  //     payload:{
  //         age:15,
  //         sex:'男'
  //     }
  // })
}

export default mutations
