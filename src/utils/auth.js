import Cookies from 'js-cookie'
const Userinfo = '28ky-userdata'

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(Userinfo))
}

export function setUserInfo(obj) {
  return localStorage.setItem(Userinfo, JSON.stringify(obj))
}

export function removeUserInfo() {
  return localStorage.removeItem(Userinfo)
}
