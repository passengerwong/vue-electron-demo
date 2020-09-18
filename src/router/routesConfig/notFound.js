// 404 页面路由配置，此处不做其他页面的配置，404页面独享
const routes = [
  { path: '*', name: 'notFound', meta: { noShowNav: true }, filePath: 'notFound' }
];

module.exports = routes;
