import store from '@/store/index';
import { clearLoginStatus } from '@/router/tools/toDoLoginStatus'; // 清空登录信息

function getUsername() {
  let { username } = store.getters.userInfo;
  if (!username) {
    username = window.localStorage.getItem('username') || '';
  }
  return username;
};

// 退出登录完整流程(注意这里传入vue实例或者修改this指向，基于实例而使用的)
// 完成后清空vuex和缓存
const logout = function(vm?: any) {
  const username: string = getUsername();
  if (vm) {
    vm.$http.get('/logout', { params: { username } }).then((res: any) => {
      const { data } = res;
      if (data && data.code === '000000') {
        store.commit('updateUserInfo', {});
        clearLoginStatus();
        vm.$router.push('/login');
      }
    });
  }
};

export default logout;
