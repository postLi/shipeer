import Axios from 'axios'
let swg1 = '/aflc-uc'

// /aflcShipperApi/listAflcDriver
// 货主收藏司机列表
export function postDriverList(params) {
  return Axios.post(''+swg1+'/aflcShipperApi/listAflcDriver',params)
}
//
// /aflcShipperApi/collectionAflcDriver/{driverMobile}
// 货主收藏司机
//
export function postDriver(driverMobile ) {
  return Axios.post(''+swg1+'/aflcShipperApi/listAflcDriver'+driverMobile )
}
