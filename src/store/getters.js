const getters = {
  // this.$store.getters.fullInfo
  nameInfo(state) {
    return '姓名:' + state.name
  },
  fullInfo(state, getters) {
    return getters.nameInfo + '年龄:' + state.age
  },
  self: state => state.user.self,
  token: state => state.user.token
  // currentCommunity: (state, getters) => {
  //   let cid = getters.currentCommunityId
  //   return getters.communities.filter(item => {
  //     return item.communityId === cid
  //   })
  // }
}

export default getters
