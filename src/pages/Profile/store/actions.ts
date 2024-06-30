import { ApiResponseGen } from '@/commons/types/apiResponseGen.ts'
import {
  UserOverviewResponse,
  UserProfitChartResponse,
  UserStatsResponse,
} from '@/pages/Profile/types.ts'
import ApiService from '@/services/api.ts'

export const getUserStats = async (
  userId: number,
): Promise<ApiResponseGen<UserStatsResponse>> => {
  const url = '/users/stats?id=' + userId
  return await new ApiService().get<ApiResponseGen<UserStatsResponse>>(url)
}

export const getUserOverview = async (
  userId: number,
): Promise<ApiResponseGen<UserOverviewResponse>> => {
  const url = '/users/overview?id=' + userId
  return await new ApiService().get<ApiResponseGen<UserOverviewResponse>>(url)
}

export const getUserProfitChart = async (
  userId: number,
): Promise<ApiResponseGen<UserProfitChartResponse>> => {
  const url = '/users/profit-chart?id=' + userId
  return await new ApiService().get<ApiResponseGen<UserProfitChartResponse>>(
    url,
  )
}
