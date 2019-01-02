import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token'),
    status: ''
  },
  mutations: {

  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {

  }
})
