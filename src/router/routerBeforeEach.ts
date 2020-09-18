import { Route } from 'vue-router';

const beforeEach = (to: Route, from: Route, next: any) => {
  const { path: toPath } = to;
  if (toPath !== '/login') {
    console.log('不是登录页面需要判断登录');
  }
  console.log('---f', toPath);
  next();
};

export default beforeEach;
