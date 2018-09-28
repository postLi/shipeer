import axios from 'axios'

let timeOut = {timeout: 1000 * 60};

// 通用接口
export const postApi = (url,params) => { return axios.post(url, params,timeOut).then(res => res); };
export const putApi = (url,params) => { return axios.put(url, params,timeOut).then(res => res); };
export const deleteApi = url => { return axios.delete(url,timeOut).then(res => res); };
export const getApi = url => { return axios.get(url,timeOut).then(res => res); };


//二进制图片
export const onlyApi = (url,params,parm2) => { return axios.post(url, params,parm2).then(res => res); };
