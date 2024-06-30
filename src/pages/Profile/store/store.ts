import { create } from 'zustand'

import {
  UserOverviewResponse,
  UserProfitChartDateValue,
  UserStatsResponse,
} from '@/pages/Profile/types.ts'

type UserStatsStateType = {
  userStats: { [userId: number]: UserStatsResponse }
  userOverview: { [userId: number]: UserOverviewResponse }
  chartValues: { [userId: number]: UserProfitChartDateValue[] }
  setUserStats: (userId: number, stats: UserStatsResponse) => void
  setUserOverview: (userId: number, overview: UserOverviewResponse) => void
  setProfitChartValues: (
    userId: number,
    values: UserProfitChartDateValue[],
  ) => void
}

const useProfileStore = create<UserStatsStateType>((set) => ({
  userStats: {},
  chartValues: {},
  userOverview: {},
  setProfitChartValues: (userId: number, chartValues) =>
    set((prevState) => ({
      chartValues: {
        ...prevState.chartValues,
        [userId]: chartValues,
      },
    })),
  setUserStats: (userId: number, userStats: UserStatsResponse) =>
    set((prevState) => ({
      userStats: {
        ...prevState.userStats,
        [userId]: userStats,
      },
    })),
  setUserOverview: (userId: number, userOverview: UserOverviewResponse) =>
    set((prevState) => ({
      userOverview: {
        ...prevState.userOverview,
        [userId]: userOverview,
      },
    })),
}))

export { useProfileStore }
