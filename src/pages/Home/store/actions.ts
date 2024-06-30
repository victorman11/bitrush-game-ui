import { useAuthStore } from '@/commons/stores'
import ApiService from '@/services/api'

import { ApiRequest, ApiResponse } from '../types'

export const getMe = async (): Promise<ApiResponse.MeResponseType> => {
  const url = '/users/me'
  const response = await new ApiService().get<ApiResponse.MeResponseType>(url)

  useAuthStore.getState().setUser(response.data)

  return response
}

export const getGameHistory =
  async (): Promise<ApiResponse.UserGameHistoryResponseType> => {
    const url = '/gameHistory'
    const response =
      await new ApiService().get<ApiResponse.UserGameHistoryResponseType>(url)

    return response
  }

export const getUserGameHistory =
  async (): Promise<ApiResponse.UserGameHistoryResponseType> => {
    const url = '/users/history'
    const response =
      await new ApiService().get<ApiResponse.UserGameHistoryResponseType>(url)
    return response
  }

export const patchUserCountryDisclaimer = async (
  payload: ApiRequest.UserCountryDisclaimerType,
) => {
  const url = '/users/country-disclaimer'
  const response = await new ApiService().patch<
    ApiRequest.UserCountryDisclaimerType,
    null
  >(url, payload)
  return response
}
