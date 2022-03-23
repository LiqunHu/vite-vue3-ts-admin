import common from '@/lib/common'

const state = {
  userInfo: common.getStoreData('userinfo') || {},
}

const mutations = {
  login(state: any, userInfo: any) {
    state.userInfo = userInfo
    common.clearStoreData()
    common.setStoreData('token', userInfo.Authorization)
    common.setStoreData('userinfo', userInfo)
  },
  logout: (state: any) => {
    state.userInfo = {}
    common.clearStoreData()
  },
}

const actions = {
  async login({ commit }: { commit: Function }, payload: any) {
    commit('login', payload)
  },
  async logout({ commit }: { commit: Function }) {
    commit('logout')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
