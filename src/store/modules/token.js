export default {
  state: {
    token: sessionStorage.getItem('token')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem("token", token)
    }
  },
  actions: {
    SetToken: ({commit}, token) => {
        commit('SET_TOKEN', token)
    }
  }
}
