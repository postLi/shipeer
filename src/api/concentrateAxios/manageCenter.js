import Axios from 'axios'
import VueJsCookie from 'vue-js-cookie'
let swg1 = 'aflcsmservice'
// let swg1 = 'aflcsmservice_wtc'
let swg2 = '/aflcsmservice'
// let swg3 = 'aflcorderservice-lyc'
let swg3 = 'aflcorderservice'
let swg4 = 'aflccommonservice'
let swg5 = 'aflcsmservice-wtc'

// let swg3 = 'aflcsmservice-wtc/v2/api-docs'
export function postFindMywallet() {
  return Axios.post('/aflcusercenterservice/aflcMywalletApi/findMywallet')
}
export function postFindAflcReward(params) {
  return Axios.post('/aflc-uc/aflcUserRewardApi/findAflcReward',params)
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
  return Axios.post(''+swg3+'/order/aflcOrderPayment/v1/findShipperOrderPayment',params)
}

// /sm/aflcCouponUse/v1/listDetailweb
// 获取优惠券领用明细表列表详情web
  export function postAflcCouponUse(params) {
  return Axios.post(''+swg5+'/sm/aflcCouponUse/v1/listDetailweb',params)
}
// /aflcCouponExchangeApi/exchange
// 兑换优惠卷
export function postExchange(couponNum) {
  return Axios.post(''+swg2+'/aflcCouponExchangeApi/exchange/'+couponNum)
}
//http://192.168.1.78:7010/aflccommonservice-lyc/aflcCommonSysDistApi/getSysDictByCodesGet?codes=das
export function getSysDictByCodesGet(das) {
  return Axios.get(''+swg4+'/aflcCommonSysDistApi/getSysDictByCodesGet/'+'?codes='+das)
}

