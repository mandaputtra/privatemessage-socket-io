import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token'),
    status: '',
    credentials: null
  },
  mutations: {
    SET_CREDENTIALS (state, creds) {
      state.credentials = creds
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    setCredentials({ commit }, creds) {
      commit('SET_CREDENTIALS', creds)
    }
  }
})
