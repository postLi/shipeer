import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import localStorage from './utils/localStorage'
import ElementUI from 'element-ui';
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import VueJsCookie from 'vue-js-cookie'
import {getUserInfo, removeUserInfo} from '@/utils/auth'
import {Message, MessageBox} from 'element-ui'
import '@/icons' // icon
import {mapGetters} from 'vuex'
import * as filters from './filters'

Vue.config.productionTip = false;
// Vue.use(Vuex);
Vue.use(ElementUI);
// 修改vue的原型对象
Vue.prototype.$http = Axios;
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$localStorage = localStorage;

Axios.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {};
  }

  let token = VueJsCookie.get('28kytoken');
  if (token) {
    config.headers['access_token'] = token;
    config.params['access_token'] = token;
  }

  token = getUserInfo();
  if (token)
    token = token.userToken;
  if (token) {
    config.params['user_token'] = token;
    config.headers['user_token'] = token;
  }

  if (config.url.indexOf('http://') === -1) {
    config.url = '/api' + config.url;
  }

  return config;
}, error => {
  // console.log('interceptors:', error);
  Promise.reject(error)
});

Axios.interceptors.response.use(
  response => {
    const res = response.data;
    // if (res.status !== 200 && response.config.url.indexOf('/uaa/oauth/token') === -1) {
    //   console.group('=============状态不对出错==============：')
    //   console.warn('请求链接：', response.config.url)
    //   console.warn('请求方法：', response.config.method)
    //   console.warn('请求链接参数：', response.config.params)
    //   console.warn('请求body参数：', response.config.data)
    //   console.warn('请求结果：', res)
    //   console.groupEnd('=============状态不对出错==============：')
    // }
    return res;
  },
  error => {
    console.warn('=============请求出错==============：')
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        Message({
          type: 'info',
          message: '尚未登录或者登录信息已失效，请重新登录. ',
          onClose: () => {
            location.href = '/#/'
          }
        });
        VueJsCookie.remove('28kytoken');
        VueJsCookie.remove('28kyuPhone');
        removeUserInfo();

        return Promise.reject(error);
      }
      return error.response;
    } else {
      console.log('response err:', error)// for debug
    }
    Message({
      type: 'info',
      message: '服务器端返回数据错误，请稍后再试. '
    });
    return error;
  }
);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
