export const state = () => ({
  token: null,
  userData: {}
})

export const mutations = {
  saveUserToken (state, payload) {
    state.token = payload
  },
  saveUserData (state, payload) {
    state.userData = payload
  }
}

export const getters = {
  fullname (state) {
    const firstName = state.userData.first
    const lastName = state.userData.last
    return `${firstName} ${lastName}`
  }
}
