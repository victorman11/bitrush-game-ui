import Cookies from 'js-cookie'

import { CookieKeys } from '@/commons/consts'

export function getToken(): string | undefined {
  return Cookies.get(CookieKeys.TOKEN_COOKIE)
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(CookieKeys.REFRESH_TOKEN_COOKIE)
}

export function storeToken(token: string, refreshToken: string) {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 7)

  const options = { expires: expirationDate }

  Cookies.set(CookieKeys.TOKEN_COOKIE, token, options)
  Cookies.set(CookieKeys.REFRESH_TOKEN_COOKIE, refreshToken, options)
}

export function clearTokens(): void {
  Cookies.remove(CookieKeys.TOKEN_COOKIE)
  Cookies.remove(CookieKeys.REFRESH_TOKEN_COOKIE)
  Cookies.remove(CookieKeys.AFFILIATE_CODE_COOKIE)
}

export function isTokenCookieSaved(): boolean {
  return !!getToken()
}

export function setValueToCookie(key: string, value: string) {
  Cookies.set(key, value)
}

export function getValueFromCookie(key: string) {
  return Cookies.get(key)
}

export function removeValueFromCookie(key: string) {
  Cookies.remove(key)
}
