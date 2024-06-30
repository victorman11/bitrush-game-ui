import ApiService from '@/services/api'

import { ApiRequest, ApiResponse } from '../types'

export const doSignUp = async (
  payload: ApiRequest.SignUpRequestType,
): Promise<ApiResponse.SignUpResponseType> => {
  const url = '/auth/signup'

  const response = await new ApiService().post<
    ApiRequest.SignUpRequestType,
    ApiResponse.SignUpResponseType
  >(url, payload)

  return response
}

export const requestEmailCode = async (payload: ApiRequest.CodeRequestType) => {
  const url = '/auth/2fa/request'

  const response = await new ApiService().post<
    ApiRequest.CodeRequestType,
    null
  >(url, payload)

  return response
}

export const validateEmailCode = async (
  payload: ApiRequest.ValidateCodeRequestType,
) => {
  const url = '/auth/2fa/validate'

  const response = await new ApiService().post<
    ApiRequest.ValidateCodeRequestType,
    null
  >(url, payload)

  return response
}
