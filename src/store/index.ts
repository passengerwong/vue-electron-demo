import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    userId: '',
    loginStatus: false
  },
  getters: {
    loginStatus: state => state.loginStatus,
    userInfo: state => state.userInfo
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateUserId(state, userId) {
      state.userId = userId || '';
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
