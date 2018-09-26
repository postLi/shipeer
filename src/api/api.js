import axios from 'axios'

let timeOut = {timeout: 1000 * 60};

// 通用接口
export const postApi = (url,params) => { return axios.post(url, params,timeOut).then(res => res.data); };
export const putApi = (url,params) => { return axios.put(url, params,timeOut).then(res => res.data); };
export const deleteApi = url => { return axios.delete(url,timeOut).then(res => res.data); };
export const getApi = url => { return axios.get(url,timeOut).then(res => res.data); };
