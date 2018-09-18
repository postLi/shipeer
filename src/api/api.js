import axios from 'axios'
import qs from 'qs'

let timeOut = {timeout: 1000 * 60};


// 通用接口
export const postApi = params => { return axios.post(`index.php?controller=admin&action=api&token=${get('token')}`, qs.stringify(params),timeOut).then(res => res.data); };

export const getApi = url => { return axios.get(url,timeOut).then(res => res.data); };
