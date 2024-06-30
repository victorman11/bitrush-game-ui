import ApiService from '@/services/api'

import { ApiResponse } from '../types'
import { networkInfoAdapter } from './adapters'

export const getNetworkInfo = async () => {
  const url = `/users/network/info`
  const response =
    await new ApiService().get<ApiResponse.GetNetworkResponseType>(url)

  return networkInfoAdapter(response.data)
}

export const getAffiliatesInfo =
  async (): Promise<ApiResponse.GetAffiliateResponseType> => {
    const url = `/users/network/affiliates`
    const response =
      await new ApiService().get<ApiResponse.GetAffiliateResponseType>(url)

    return response
  }
