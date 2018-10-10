import Axios from 'axios'
let swg1 = '/aflcorderservice'
let swg2 = '/aflc-order'
let swg3 = '/aflc-common'
let swg4 = '/aflc-pay'
let swg5 = '/aflc-uc'
  // /aflcMyOrderApi/myOrderList
// 订单状态(此值不传(null或空字符串)则为查询全部，待付款(AF00801),服务中(AF00806HZ),已取消(AF00808),派单中(AF00804))
// 我的订单(货主)
export function postMyOrderList(currentPage,pageSize,status) {
  return Axios.post(''+swg1+'/aflcMyOrderApi/myOrderList'+'?currentPage='+currentPage +'&pageSize='+pageSize+'&status='+status)
}
// //同城状态订单状态
// WAIT_PAY("AF00801","待付款"),
//   SERVICING("AF00806HZ","服务中"),
//   DISPATCHING("AF00804","派单中"),
//   DRIVER_ORDER_TAKING("AF0080601HZ","司机已接单"),
//   DRIVER_TO_DELIVERY_DESTINATION("AF0080602HZ","司机赶往提货地"),
//   TRANSPORTING("AF0080605HZ","运输中"),
//   DRIVER_AT_DESTINATION("AF0080606HZ","司机已到目的地"),
//   DRIVER_AT_DISCHARGE("AF0080607HZ","司机已卸货"),
//   COMPLETE("AF00807","已完成"),
//   WAIT_EVALUATED("AF0080701","待评价"),
//   AllREADY_EVALUATED("AF0080702","已评价"),
//   WAIT_RETURN("AF0080703","待回单"),
//   AT_RETURN("AF0080704","已回单"),
//   WAIT_RETURN_MONEY("AF0080705","待回款"),
//   AT_RETURN_MONEY("AF0080706","已回款"),
//  付款状态
// WAIT_PAY("AF00801", "待付款"),
//   ALREADY_PAY("AF00802", "已付款"),
//   ALREADY_RETURN("AF00803", "已退款");
// "AF00808","已取消"
// "AF0080603HZ","司机已到提货地"

// /shipperService/evaluateShipper
// 货主评价司机(司机端)
export function postEvaluateShipper(params) {

  return Axios.post(''+swg2+'/shipperService/evaluateShipper',params)
}
// /aflcCommonSysDistApi/getSysDictByCodesGet
// 根据code值查找子字典类型
// codes=AF0042101   好评AF0042102"
export function getSysDictByCodesGet(codes) {

  return Axios.get(''+swg3+'/aflcCommonSysDistApi/getSysDictByCodesGet/'+'?codes='+codes)
}


// /common/aflcMemberCenter/v1/getAuroraAuthInfo
// 获取极光鉴权信息
// 用户类型（1：车主；2：货主）
export function getAuroraSignature()  {

  return Axios.get(''+swg3+'/common/aflcMemberCenter/v1/getAuroraAuthInfo/'+'?type='+2)
}


// /pay/shipper/common/v1/scanPayOrder/{orderSerial}
// 货主WEB扫码支付

export function postScanPayOrder(orderSerial,params) {
  return Axios.request({
    url:''+swg4+'/pay/shipper/common/v1/scanPayOrder/'+orderSerial,
    responseType:'blob',
    method: 'post',
    data: params
  })

}
// /aflcMywalletApi/mywalletPay/{orderSerial}
// 货主端-钱包支付

export function postMywalletPay(orderSerial ) {

  return Axios.post(''+swg5+'/aflcMywalletApi/mywalletPay/'+orderSerial)
}
// /aflcMyOrderApi/myOrderDetail
// 我的订单详情(货主)
export function postMyOrderDetail(orderSerial ) {

  return Axios.post(''+swg2+'/aflcMyOrderApi/myOrderDetail'+'?orderSerial='+orderSerial)
}
// /usercenter/aflcDriver/v1/{id}
// 根据id获取车主
export function getLcDriver(id ) {

  return Axios.get(''+swg5+'/usercenter/aflcDriver/v1/'+id)
}


// /sysDict/findAflcCommonSysDictBycode/{code}
// 根据code值查找当前属性
export function getSysDictBycode(codes) {

  return Axios.get(''+swg3+'/sysDict/findAflcCommonSysDictBycode/'+codes)
}
//添加小费
export function getSysDictByCodeGet(codes) {

  return Axios.get(''+swg3+'/sysDict/getSysDictByCodeGet/'+codes)
}

///aflcOrderApi/addTip
//确定 增加小费(货主端)
// "orderSerial": "string",
//   "shipperId": "string",
//   "tip": 0
export function postAddTip(params ) {

  return Axios.post(''+swg2+'/aflcOrderApi/addTip',params)
}
///shipperService/confirmGoods
// 确认收货(货主端)
export function postConfirmGoods(orderSerial,shipperId) {

  return Axios.post(''+swg2+'/shipperService/confirmGoods'+'?orderSerial='+orderSerial+'&shipperId='+shipperId)
}
//
// /aflcCommonSysDistApi/findAflcCommonSysDictBycode/{code}
// 根据code值查找当前属性
// 根据code值查找当前属性  收藏@"AF0051601",  未收藏@"AF0051602"
export function getFCode(code) {

  return Axios.get(''+swg3+'/aflcCommonSysDistApi/findAflcCommonSysDictBycode/'+code)
}
