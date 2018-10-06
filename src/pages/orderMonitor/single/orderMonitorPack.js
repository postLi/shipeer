import Vue from 'vue';
import App from '@/App';
import router from 'router';
import localStorage from '@/utils/localStorage';
import ElementUI from 'element-ui';
import Axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$http = Axios;
Vue.prototype.$localStorage = localStorage;

Axios.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {};
  }

  var v = VueJsCookie.get('28kytoken');
  if (v) {
    config.params['access_token'] = v;
  }

  v = localStorage.get("28ky-userdata");
  if (v && v.userToken) {
    config.params['user_token'] = v.userToken;
  }

  if (config.url.indexOf('http://') === -1) {
    config.url = '/api' + config.url;
  }

  return config;
}, error => {
  console.log('interceptors:', error);
});

Axios.interceptors.response.use(
  response => {
  },
  error => {
    console.warn('请求出错：', error);
  }
);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
