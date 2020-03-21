import Cookies from 'js-cookie'

const TokenKey = 'endless_nighmare'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookie(key) {
  return Cookies.get(key)
}

export function setCookie(key, value, expireDays) {
  Cookies.set(key, value, { expires: expireDays })
}

export function removeCookies(key){
  Cookies.remove(key)
}
