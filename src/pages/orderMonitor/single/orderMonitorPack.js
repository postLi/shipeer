import Vue from 'vue'
import App from '@/App'
import router from 'router'
import store from '../../../store/index'
import localStorage from '../../../utils/localStorage'
import ElementUI from 'element-ui';
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$http = Axios;
Vue.prototype.$localStorage = localStorage;
const url = '/api';

Axios.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {}
  }

  let token = VueJsCookie.get('28kytoken')
  if (token) {
    config.params['access_token'] = token;
  }

  if(localStorage.get("28ky-userdata")){
    config.params['user_token'] = localStorage.get("28ky-userdata").userToken
  }

  if (config.url.indexOf('http://') === -1) {
     config.url = '/api' + config.url
  }

  return config
}, error => {
   console.log('interceptors:', error);
  Promise.reject(error)
});

// respone拦截器
Axios.interceptors.response.use(
  response => {
    /**
     * status为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data

    if (res.status !== 200 && response.config.url.indexOf('/uaa/oauth/token') === -1) {
      console.group('=============状态不对出错==============：')
      console.warn('请求链接：', response.config.url)
      console.warn('请求方法：', response.config.method)
      console.warn('请求链接参数：', response.config.params)
      console.warn('请求body参数：', response.config.data)
      console.warn('请求结果：', res)
      console.groupEnd('=============状态不对出错==============：')
    }
    return res
  },
  error => {
    console.warn('=============请求出错==============：', error)
    let err = error
    if (error.response) {
      const status = error.response.status

      if (status === 403) {
        err = {
          text: '禁止访问',
          status: 100
        }

      } else if (status === 404) {
        err = {
          text: '未找到相关信息',
          status: 100
        }

      } else if (status === 401) {
        err = {
          text: '',
          status: 200
        }

        Message({
          type: 'info',
          message: '登录信息已失效，请重新登录. ',
          onClose: ()=>{
            location.href = '/#/'
          }
        })
        VueJsCookie.remove('28kytoken')
        VueJsCookie.remove('28kyuPhone')
        removeUserInfo()


        // 401:非法的token;Token 过期了;
        return false
      } else {
        err = {
          text: '请求错误：' + status,
          status: 100
        }

      }
    } else {
      console.log('response err:', error)// for debug

    }
    return Promise.reject(err)
  }
);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
