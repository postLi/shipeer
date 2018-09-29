import Cookies from 'js-cookie'
const Userinfo = '28ky-userdata'
const serverPhone = '28ky-serverPhone'
const orderDtaial = '28ky-orderDetail'

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(Userinfo))
}

export function setUserInfo(obj) {
  return localStorage.setItem(Userinfo, JSON.stringify(obj))
}

export function removeUserInfo() {
  return localStorage.removeItem(Userinfo)
}
export function getServerPhone() {
  return JSON.parse(localStorage.getItem(serverPhone))
}

export function setServerPhone(obj) {
  return localStorage.setItem(serverPhone, JSON.stringify(obj))
}

export function removeServerPhone() {
  return localStorage.removeItem(serverPhone)
}
export function getOrderDtaial() {
  return JSON.parse(localStorage.getItem(orderDtaial))
}

export function setOrderDtaial(obj) {
  return localStorage.setItem(orderDtaial, JSON.stringify(obj))
}

export function removeOrderDtaial() {
  return localStorage.removeItem(orderDtaial)
}
