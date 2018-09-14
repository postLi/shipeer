import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(ElementUI);
// 修改vue的原型对象
Vue.prototype.$http = Axios;
const url = 'http://192.168.1.78:7010';

Axios.defaults.baseURL = url ;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
