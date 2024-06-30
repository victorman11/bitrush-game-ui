import ApiService from '@/services/api'

import { ApiRequest, ApiResponse } from '../types'

export const doSignIn = async (
  payload: ApiRequest.SignInRequestType,
): Promise<ApiResponse.SignInResponseType> => {
  const url = '/auth/signin'

  const response = await new ApiService().post<
    ApiRequest.SignInRequestType,
    ApiResponse.SignInResponseType
  >(url, payload)

  return response
}
