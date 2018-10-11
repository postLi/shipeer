import Axios from 'axios'

let swg1 = '/aflc-uc'
let swg2 = '/aflc-order'

// /aflcShipperApi/listAflcDriver
// 货主收藏司机列表
export function postDriverList(params) {
  return Axios.post('' + swg1 + '/aflcShipperApi/listAflcDriver', params)
}

//
// /aflcShipperApi/collectionAflcDriver/{driverMobile}
// 货主收藏司机
//
export function postDriver(driverMobile) {
  return Axios.post('' + swg1 + '/aflcShipperApi/collectionAflcDriver/' + driverMobile)
}

// /dispatch/aflcDriverShipper/v1/appDelAflcDriverShipper/{id}
// APP端删除车主
export function deleteDriver(id) {
  return Axios.delete('' + swg2 + '/dispatch/aflcDriverShipper/v1/appDelAflcDriverShipper/' + id)
}
