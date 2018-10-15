import Axios from 'axios'

let sw1 = '/aflc-common'
let sw2 = '/aflc-uc'

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
  return '/api/aflccommonservice/common/aflcMemberCenter/v1/getImageCode?imageWidth=' + imageWidth + '&imageHeight=' + imageHeight + '&rd=' + (Math.random())

}

export function validLoginCode(code) {
  return Axios.get('/aflccommonservice/common/aflcMemberCenter/v1/checkImageCode/' + code)
}

export function validLoginPhone(code) {
  return Axios.post('' + sw1 + '/aflcCommonSms/sendCodeSms/' + code)
}

export function validLoginServicePhone() {
  return Axios.get('' + sw1 + '/aflcCommonSysDistApi/getPlatformCustomerServicePhone')
}


export function getUser(mobile) {
  return Axios.get('' + sw1 + '/common/aflcMemberCenter/v1/getShipperInfoByMobile?mobile=' + mobile)
}

//http://192.168.1.78:7010/uaa/oauth/token?access_token=3b6cde08-1bb6-481d-8e7d-99a653325451
// export function deleteToken() {
//   return Axios.delete('/uaa/oauth/token')
// }

// export function deleteToken(username, password, orgid) {
//   var grant_type = 'password'
//   var scope = 'webApp'
//   /*   return fetch.post('/uaa/oauth/token', {
//       username,
//       password,
//       grant_type,
//       orgid
//       // scope,
//     }, {
//       headers: {
//         // 'content-type': 'application/x-www-form-urlencoded',
//         'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
//       }
//     }) */
//   const form = new FormData()
//   form.append('username', username)
//   form.append('password', password)
//   form.append('grant_type', grant_type)
//   return Axios.request({
//     url: '/uaa/oauth/token',
//     method: 'delete',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
//     },
//     data: form
//   })
//
// }
export function deleteToken() {
  return Axios.delete('/uaa/oauth/token', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}

///common/aflcMemberCenter/v1/retrievePassword
// 找回密码  AF0010101
// "memberType=AF0010101&mobile=1892222222&imageCode=1234&smsCode=334&password=12344&passwordSure=224455"

export function putretrievePassword(mobile, imageCode, smsCode, password, passwordSure) {
  return Axios.put('' + sw1 + '/common/aflcMemberCenter/v1/getShipperInfoByMobile?memberType=' + AF0010101 + '&mobile=' + mobile + '&imageCode=' + imageCode + '&smsCode=' + smsCode + '&password=' + password + '&passwordSure=' + passwordSure)
}

export function putupdatePassword(mobile, oldPassword, newPassword, surePassword) {
  let str = ''
  let obj
  for (const i in obj) {
    str += '&' + i + '=' + obj[i]
  }
  return Axios.request({
    url: '' + sw1 + '/common/aflcMemberCenter/v1/updatePassword' + '?memberType=' + 'AF0010101' + '&mobile=' + mobile + '&oldPassword=' + oldPassword + '&newPassword=' + newPassword + '&surePassword=' + surePassword,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: str
  })

}

// /aflcShipperApi/authentication
// 货主认证
export function postAuthentication(params) {
  return Axios.post('' + sw1 + '/aflcShipperApi/authentication/' , params)
}


