import Axios from 'axios'
let swg1 = 'aflcorderservice'
  // /aflcMyOrderApi/myOrderList
// 我的订单(货主)
export function postMyOrderList(currentPage,pageSize,status) {
  return Axios.post(''+swg1+'/aflcMyOrderApi/myOrderList/'+'?currentPage='+currentPage +'&pageSize='+pageSize+'&status='+status)
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
