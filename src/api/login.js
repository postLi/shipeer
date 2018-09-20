import Axios from 'axios'

export function login(username, password, orgid) {
  var grant_type = 'password'
  var scope = 'webApp'
  /*   return fetch.post('/uaa/oauth/token', {
      username,
      password,
      grant_type,
      orgid
      // scope,
    }, {
      headers: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
      }
    }) */
  const form = new FormData()
  form.append('username', username)
  form.append('password', password)
  form.append('grant_type', grant_type)
  return Axios.request({
    url: '/uaa/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    data: form
  })

}
export function loginValid(username, password, orgid) {
  var grant_type = 'authorization_code'
  var scope = 'webApp'
  const form = new FormData()
  form.append('mobile', username)
  form.append('code', password)
  form.append('grant_type', grant_type)
  return Axios.request({
    url: '/uaa/mobile/token',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    data: form
  })

}

export function loginCode(imageWidth = 120, imageHeight = 30) {
  return '/api/aflccommonservice/common/aflcMemberCenter/v1/getImageCode?imageWidth='+imageWidth+'&imageHeight=' + imageHeight+'&rd=' + (Math.random())

}

export function validLoginCode(code) {
  return Axios.get('/aflccommonservice/common/aflcMemberCenter/v1/checkImageCode/' + code)
}
export function validLoginPhone(code) {
  return Axios.post('/aflc-common/aflcCommonSms/sendCodeSms/' + code)
}

export function validLoginServicePhone() {
  return Axios.get('/aflc-common/aflcCommonSysDistApi/getPlatformCustomerServicePhone')
}



export function getUser(mobile) {
  return Axios.get('/aflc-common/common/aflcMemberCenter/v1/getShipperInfoByMobile?mobile='+mobile)
}

// export function testApi(){
//   return Axios.get('/sdfsdfsdf')
// }
