// 该文件为最终路由表，为项目打包时候自动生成的文件，不需要手动修改该文件（修改也会无效被覆盖）
const routes: any = [
  { path: '/', name: '/', redirect: '/index' },
  { path: '/index', name: 'index', component: () => import(/* webpackChunkName: 'index' */ '@/views/home/index.vue') },
  { path: '/userManagement', name: 'userManagement', component: () => import(/* webpackChunkName: 'userManagement' */ '@/views/userRightsManagement/userManagement.vue') },
  { path: '/roleManagement', name: 'roleManagement', component: () => import(/* webpackChunkName: 'roleManagement' */ '@/views/roleManagement/roleManagement.vue') },
  { path: '/menuManagement', name: 'menuManagement', component: () => import(/* webpackChunkName: 'menuManagement' */ '@/views/menuManagement/menuManagement.vue') },
  { path: '/login', name: 'login', meta: { 'noShowNav': true }, component: () => import(/* webpackChunkName: 'login' */ '@/views/login/login.vue') },
  { path: '/editPassWord', name: 'editPassWord', meta: { 'noShowNav': true }, component: () => import(/* webpackChunkName: 'editPassWord' */ '@/views/login/editPassWord.vue') },
  { path: '*', name: 'notFound', meta: { 'noShowNav': true }, component: () => import(/* webpackChunkName: 'notFound' */ '@/views/notFound/notFound.vue') }
];
export default routes;
