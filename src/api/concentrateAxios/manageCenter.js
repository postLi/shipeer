import Axios from 'axios'
import VueJsCookie from 'vue-js-cookie'
let swg1 = 'aflcsmservice_wtc'
let swg2 = 'aflcSmService'
let swg3 = 'aflcorderservice-lyc'
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
  return Axios.get(''+swg2+'/sm/aflcCouponUse/v1/couponCountWeb')
}
// /order/aflcOrderPayment/v1/findShipperOrderPayment
// 货主交易记录
export function postFindSOPayment(params) {
  return Axios.post(''+swg3+'/order/aflcOrderPayment/v1/findShipperOrderPayment',params).then(res =>{
    return res.data || { list: [], totalCount: 0 }
  })
}
