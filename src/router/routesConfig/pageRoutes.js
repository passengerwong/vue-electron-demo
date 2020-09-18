
/**
 * 路由配置表参数说明：
 * path: 路由路径（页面中hash值）
 * name: 路由页面的name
 * filePath: 路由配置，文件所在目录名称(说明这里我们统一使用从views下级目录开始，第一级不带/)
 * meta：路由元信息
 *      auth：是否需要登录--目前除了登录页外都需要所以可以不单独配置
 *      noShowNav: 是否需要显示导航条，登陆页面不需要显示
 * 最终拼接路径： '@/views/{{filePath}}/{{name}}.vue'
*/

const routes = [
  { path: '/', name: '/', redirect: '/index' },
  { path: '/index', name: 'index', filePath: 'home' },
  { path: '/userManagement', name: 'userManagement', filePath: 'userRightsManagement' },
  { path: '/roleManagement', name: 'roleManagement', filePath: 'roleManagement' },
  { path: '/menuManagement', name: 'menuManagement', filePath: 'menuManagement' },
  { path: '/login', name: 'login', filePath: 'login', meta: { noShowNav: true } },
  { path: '/editPassWord', name: 'editPassWord', meta: { noShowNav: true }, filePath: 'login' }
];

module.exports = routes;
