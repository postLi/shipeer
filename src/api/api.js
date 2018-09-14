import axios from 'axios'
import qs from 'qs'

let get= function(key) {
  return window.JSON.parse(window.localStorage.getItem(key));
};

// 延迟时间
let timeOut = {timeout: 1000 * 60};
let token = get('token');

// 调用x1,x2接口
let changeUrl = `index.php?controller=admin&action=api&token=${get('token')}`;

/********************** X1X2所有接口 *******************************/
// 通用接口
export const oneTwoApi = params => { return axios.post(`index.php?controller=admin&action=api&token=${get('token')}`, qs.stringify(params),timeOut).then(res => res.data); };
