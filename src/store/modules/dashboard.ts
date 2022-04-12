import common from '@/lib/common'

const state = {
  userInfo: common.getStoreData('userinfo') || {},
  collapse: false,
  tagsList: [],
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
  setCollapse: (state: any, cState: boolean) => {
    state.collapse = cState
  },
  delTagsItem(state: any, data: any) {
    state.tagsList.splice(data.index, 1)
  },
  setTagsItem(state: any, data: any) {
    state.tagsList.push(data)
  },
  clearTags(state: any) {
    state.tagsList = []
  },
  closeTagsOther(state: any, data: any) {
    state.tagsList = data
  },
}

const actions = {
  async login({ commit }: { commit: Function }, payload: any) {
    commit('login', payload)
  },
  async logout({ commit }: { commit: Function }) {
    commit('logout')
  },
  setCollapse({ commit }: { commit: Function }, payload: any) {
    commit('setCollapse', payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
