import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main/main.vue'
import Login from '@/pages/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children:[


      ]
    },


    {
      path: '/', component: Login,name:'Login'
    },
  ]
})
