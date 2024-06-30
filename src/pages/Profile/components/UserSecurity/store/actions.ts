import ApiService from '@/services/api'

import * as ApiRequest from '../types/apiRequest'

export const patchEditPassword = async (
  payload: ApiRequest.UpdatePasswordRequestType,
) => {
  const url = '/users/password'

  const response = await new ApiService().patch<
    ApiRequest.UpdatePasswordRequestType,
    null
  >(url, payload)

  return response
}

export const patchEditEmail = async (
  payload: ApiRequest.UpdateEmailRequestType,
) => {
  const url = '/users/profile/email'

  const response = await new ApiService().patch<
    ApiRequest.UpdateEmailRequestType,
    null
  >(url, payload)

  return response
}

export const postDeleteAccount = async (
  payload: ApiRequest.DeleteAccountRequestType,
) => {
  const url = '/users/profile/account/delete'

  const response = await new ApiService().post<
    ApiRequest.DeleteAccountRequestType,
    null
  >(url, payload)

  return response
}
