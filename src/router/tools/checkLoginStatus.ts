// import store from '../../store/index';
/**
 * checkLoginStatus 登录状态检测
 * @return {boolean} 是否登录布尔类型
*/
export default function checkLoginStatus() {
  // 获取登录状态位置：vuex or localstroge，优先更准确为localstroge
  // const { state: { loginStatus } } = store;
  const loginStatus = window.localStorage.getItem('loginStatus');
  // return Boolean(loginStatus);
  return loginStatus === '1';
};
