import Axios from 'axios'
let swg1 = 'aflc-order'
// /order/aflcOrder/v1/orderManager
// 订单管理
export function postMyOrderList(params) {
  return Axios.post(''+swg1+'/order/aflcOrder/v1/orderManager',params).then(res =>{
    return res.data || { list: [], totalCount: 0 }
  })
}
