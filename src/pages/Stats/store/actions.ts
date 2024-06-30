import { ApiResponseGen } from '@/commons/types/apiResponseGen.ts'
import { StatsResponse } from '@/pages/Stats/types.ts'
import ApiService from '@/services/api.ts'

export const getStats = async (): Promise<ApiResponseGen<StatsResponse>> => {
  const url = '/gameHistory/statistics'
  return await new ApiService().get<ApiResponseGen<StatsResponse>>(url)
}
