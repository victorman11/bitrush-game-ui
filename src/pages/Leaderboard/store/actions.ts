import { ApiResponseGen } from '@/commons/types/apiResponseGen.ts'
import { LeaderboardResponse } from '@/pages/Leaderboard/types.ts'
import ApiService from '@/services/api.ts'

export const getLeaderboard = async (
  limit: number,
): Promise<ApiResponseGen<LeaderboardResponse>> => {
  const url = '/gameHistory/leaderboards?limit=' + limit
  return await new ApiService().get<ApiResponseGen<LeaderboardResponse>>(url)
}
