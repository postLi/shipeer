import Axios from 'axios'
import {getUserInfo} from '@/utils/auth'
import VueJsCookie from 'vue-js-cookie'
let swg1 = 'aflcsmservice_wtc'
export function postFindMywallet() {
  return Axios.post('/aflcusercenterservice/aflcMywalletApi/findMywallet')
}
export function postFindAflcReward(params) {
  return Axios.post('/aflc-uc/aflcUserRewardApi/findAflcReward',params).then(res =>{
    return res.data || { list: [], totalCount: 0 }
  })
}
///sm/aflcCouponUse/v1/couponCountWeb/{userId}
// 通过用户userId获取优惠劵数量
// export function getCouponCount(userId) {
//   return Axios.get(''+swg1+'/sm/aflcCouponUse/v1/couponCountWeb/'+userId)
// }
export function getCouponCount() {
  return Axios.get(''+swg1+'/sm/aflcCouponUse/v1/couponCountWeb')
}

