import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    status: '',
    credentials: null
  },
  mutations: {
    SET_CREDENTIALS (state, creds) {
      state.credentials = creds
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    LOG_OUT (state) {
      state.token = null
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    setCredentials ({ commit }, creds) {
      commit('SET_CREDENTIALS', creds)
    },
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    logOut ({ commit }) {
      commit('LOG_OUT')
    }
  }
})
