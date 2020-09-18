import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routesConfig/routeConfig';
import routerBeforeEach from './routerBeforeEach';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});
// routerBeforeEach
router.beforeEach(routerBeforeEach);

export default router;
