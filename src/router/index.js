import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children:[]
    },
    {
      path: '/', redirect: '/login'
    },
    {
      path: '*', redirect: '/login'
    },
  ]
})
