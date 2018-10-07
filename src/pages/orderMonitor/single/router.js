import Vue from 'vue'
import Router from 'vue-router'
const OrderMonitor = () => import('../orderMonitor.vue');
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/orderMonitor',
      name: 'orderMonitor',
      component: OrderMonitor,
    }
  ]
})
