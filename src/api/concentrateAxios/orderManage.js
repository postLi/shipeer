import Axios from 'axios'
let swg1 = 'aflcorderservice'
  // /aflcMyOrderApi/myOrderList
// 我的订单(货主)
export function postMyOrderList(currentPage,pageSize,status) {
  return Axios.post(''+swg1+'/aflcMyOrderApi/myOrderList/'+'?currentPage='+currentPage +'&pageSize='+pageSize+'&status='+status)
}
