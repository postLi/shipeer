import Axios from 'axios'
import VueJsCookie from 'vue-js-cookie'
let swg1 = 'aflcsmservice'
// let swg1 = 'aflcsmservice_wtc'
let swg2 = '/aflcsmservice'

// let swg3 = 'aflcorderservice-lyc'
let swg3 = 'aflcorderservice'
let swg4 = 'aflccommonservice'
let swg5 = 'aflcsmservice-wtc'
let swg6 = '/aflcusercenterservice'
let swg7 = '/aflc-pay'
let swg8 = '/aflcusercenterservice-wtc'
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
export function postExchange(params) {
  return Axios.post(''+swg5+'/aflcCouponExchangeApi/exchange/',params)
}
//http://192.168.1.78:7010/aflccommonservice-lyc/aflcCommonSysDistApi/getSysDictByCodesGet?codes=das
export function getSysDictByCodesGet(das) {
  return Axios.get(''+swg4+'/aflcCommonSysDistApi/getSysDictByCodesGet/'+'?codes='+das)
}

// /aflcRechargeApi/createAflcRecharge
// APP创建钱包充值记录
export function postCreateAflcRecharge(params) {
  return Axios.post(''+swg6+'/aflcRechargeApi/createAflcRecharge',params)
}
// 货主扫码充值支付
///pay/shipper/common/v1/scanPay/{orderSerial}
export function postScanPay(orderSerial,params) {
  return Axios.request({
    url:''+swg7+'/pay/shipper/common/v1/scanPay/'+orderSerial,
    responseType:'blob',
    method: 'post',
    data: params
  })
  // return Axios.post(''+swg7+'/pay/shipper/common/v1/scanPay/'+orderSerial,params)
}
// /api/pay/shipper/common/v1/tradeQuery/{orderSerial}
// 货主支付查询
export function postTradeQuery(orderSerial,type) {
  return Axios.post(''+swg7+'/api/pay/shipper/common/v1/tradeQuery/'+orderSerial,{
    payChannel: type
  })
}
// /aflcUserRewardApi/findAflcReward
// 优惠金明细表列表
export function postFlcReward(params) {
  return Axios.post(''+swg8+'/usercenter/aflcUserReward/v1/findAflcRewardWeb',params)
}
