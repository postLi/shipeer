import axios from 'axios'

let timeOut = {timeout: 1000 * 60};

// 通用接口
export const postApi = (url,params,conf) => { return axios.post(url, params,conf).then(res => res.data); };

export const getApi = url => { return axios.get(url).then(res => res.data); };
