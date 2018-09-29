import axios from 'axios'
import qs from 'qs'
let timeOut = {timeout: 1000 * 60};

// 通用接口
export const postApi = (url,params) => { return axios.post(url, params,timeOut).then(res => res); };
export const putApi = (url,params) => { return axios.put(url, params,timeOut).then(res => res); };
export const deleteApi = url => { return axios.delete(url,timeOut).then(res => res); };
export const getApi = url => { return axios.get(url,timeOut).then(res => res); };


//二进制图片
export const imgApi = (url,params) => { return axios.post(url, params,{
  responseType:'blob',
  timeout: 1000 * 60,
}).then(res => res); };


//x-www-form-urlencoded
export const pustApiX = (url,params) => { return axios.post(url, qs.stringify(params),{
  headers: {
    'timeout': 1000 * 60,
    'Content-Type': 'application/x-www-form-urlencoded',
  }}).then(res => res); };


export const putApiX = (url,params) => { return axios.put(url, qs.stringify(params),{
  headers: {
    'timeout': 1000 * 60,
    'Content-Type': 'application/x-www-form-urlencoded',
  }}).then(res => res); };
