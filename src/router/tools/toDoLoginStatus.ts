// 操作登录状态方法
import store from '@/store/index';

function clearLoginStatus() { // 清空登录状态
  // 登录状态
  store.commit('updateLoginStatus', '');
  window.localStorage.setItem('loginStatus', '');
  // 用户信息
  store.commit('updateUserInfo', {});
  window.localStorage.setItem('username', '');
  // userid
  store.commit('updateUserId', '');
  window.localStorage.setItem('userId', '');
};

export { clearLoginStatus };
