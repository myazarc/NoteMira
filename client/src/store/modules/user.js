const state = {
    userData: {},
    isLogin: false,
    isAdmin:false,
  };
  
  const mutations = {
    setLogin(state, data) {
      state.isLogin = true;
      state.isAdmin = data.ISADMIN;
      state.userData = data;
    },
    setLogout(state) {
      state.isLogin = false;
      state.isAdmin = false;
      state.userData = {};
    },
  };
  
  const actions = {
    doLogin({ commit }, payload) {
      commit('setLogin', payload);

    },
    doLogout({ commit }) {
      commit('setLogout');
    },
  };

  export default {
    state,
    mutations,
    actions,
  };