const actions = {
  login({ commit }, value) {
    commit('SET_USER', value)
    // commit('SET_TOKEN', value2)
  },
  // aEdit(context,payload){
  //     setTimeout(()=>{
  //         context.commit('edit',payload)
  //     },2000)
  // }
  // this.$store.dispatch('aEdit',{age:15})
  aEdit(context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('edit', payload)
        resolve()
      }, 2000)
    })
  }
}

export default actions
