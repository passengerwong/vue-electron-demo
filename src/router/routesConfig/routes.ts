import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  { path: '/', name: '/', redirect: '/index' },
  { path: '/index', name: 'Index', component: () => import('@/views/home/index.vue') },
  { path: '/userManagement', name: 'userManagement', component: () => import('@/views/userRightsManagement/index.vue') },
  { path: '/roleManagement', name: 'roleManagement', component: () => import('@/views/roleManagement/index.vue') },
  { path: '/menuManagement', name: 'menuManagement', component: () => import('@/views/menuManagement/index.vue') },
  { path: '/login', name: 'login', meta: { noShowNav: true }, component: () => import('@/views/login/login.vue') },
  { path: '/editPassWord', name: 'editPassWord', meta: { noShowNav: true }, component: () => import('@/views/login/editPassWord.vue') }
];

export default routes;
