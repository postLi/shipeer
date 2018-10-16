import Axios from 'axios'

let swg1 = '/aflc-uc'
let swg2 = '/aflc-order'

  // /dispatch/aflcDriverShipper/v1/appListAflcDriver
// APP端货主收藏司机列表
export function postDriverList(params) {
  return Axios.post('' + swg2 + '/dispatch/aflcDriverShipper/v1/appListAflcDriver', params)
}

//
// /aflcShipperApi/collectionAflcDriver/{driverMobile}
// 货主收藏司机
//
export function postDriver(driverMobile) {
  return Axios.post('' + swg1 + '/aflcShipperApi/collectionAflcDriver/' + driverMobile)
}


// /dispatch/aflcDriverShipper/v1/appDelAflcDriverShipper/{id}
// APP货主删除收藏司机
export function deleteDriver(id) {
  return Axios.delete('' + swg2 + '/dispatch/aflcDriverShipper/v1/appDelAflcDriverShipper/' + id)
}
