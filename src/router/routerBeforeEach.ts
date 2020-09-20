import { Route } from 'vue-router';
import checkLoginStatus from './tools/checkLoginStatus';

const beforeEach = (to: Route, from: Route, next: any) => {
  const { path: toPath } = to;
  if (toPath !== '/login') {
    const loginStatus = checkLoginStatus();
    console.log('不是登录页面需要判断登录', loginStatus);
    if (!loginStatus) {
      next({ path: '/login', query: { isNeedBack: true } });
      return;
    }
  }
  next();
};

export default beforeEach;
