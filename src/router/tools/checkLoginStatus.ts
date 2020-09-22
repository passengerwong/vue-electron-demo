import store from '@/store/index';
/**
 * checkLoginStatus 登录状态检测
 * @return {boolean} 是否登录布尔类型
*/
export default function checkLoginStatus() {
  // 获取登录状态位置：vuex ===》 localstroge
  let loginStatus: string | null = store.getters.loginStatus; // vuex取值
  if (!loginStatus || loginStatus !== '1') { // vuex没有登录的时候，从localstroge中再取一次
    loginStatus = window.localStorage.getItem('loginStatus');
  }
  return loginStatus === '1';
};
