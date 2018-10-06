import Vue from 'vue'
import Vuex from 'vuex'
import App from '../../App'
import router from '../../router/index'
import store from '../../store/index'
import localStorage from '../../utils/localStorage'
import ElementUI from 'element-ui';
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import VueJsCookie from 'vue-js-cookie'
import {getUserInfo,removeUserInfo} from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
import '@/icons' // icon
import { mapGetters } from 'vuex'
import * as filters from '../../filters/index'

Vue.config.productionTip = false;
// Vue.use(Vuex);
Vue.use(ElementUI);
// 修改vue的原型对象
Vue.prototype.$http = Axios;
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$localStorage = localStorage;
const url = '/api';

// Axios.defaults.baseURL = "http://192.168.1.78:7010" ;

// request拦截器
Axios.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {}
  }

  let token = VueJsCookie.get('28kytoken')
  if (getUserInfo() && getUserInfo().userToken) {

    // config.headers.user_token = getUserInfo().userToken
    config.params['user_token'] = getUserInfo().userToken
  }

  if (token) {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['access_token'] = token
    // config.headers.Authorization = 'Bearer ' + getToken()

    // 暂时放到链接中

    config.params['access_token'] = token
    // console.log(config.url, config.params)
  }

  if(localStorage.get("28ky-userdata")){
    config.headers['user_token'] = localStorage.get("28ky-userdata").userToken
  }

  if (config.url.indexOf('http://') === -1) {
     config.url = '/api' + config.url
  }

  return config
}, error => {
  // Do something with request error
  console.log('interceptors:', error) // for debug
  Promise.reject(error)
})

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
)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})