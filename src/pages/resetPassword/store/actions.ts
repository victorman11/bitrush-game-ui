import ApiService from '@/services/api'

import { ApiRequest } from '../types'

export const doResetPassword = async (
  payload: ApiRequest.PasswordResetRequestType,
  token: string,
): Promise<Record<string, null>> => {
  const url = `auth/password/reset/${token}`

  const response = await new ApiService().post<
    ApiRequest.PasswordResetRequestType,
    Record<string, null>
  >(url, payload)

  return response
}

export const validateHash = async (
  payload: string,
): Promise<Record<string, null>> => {
  const url = `auth/password/reset/${payload}`

  const response = await new ApiService().get<Record<string, null>>(url)

  return response
}
