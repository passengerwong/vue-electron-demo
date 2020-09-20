import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    userId: '',
    loginStatus: false
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      if (userInfo && Object.keys(userInfo).length) {
        state.userInfo = userInfo;
      }
    },
    updateLoginStatus(state, status) {
      state.loginStatus = status || false;
    }
  },
  actions: {
  },
  modules: {
  }
});
