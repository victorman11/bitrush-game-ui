import { create } from 'zustand'

import { LeaderboardResponse } from '@/pages/Leaderboard/types.ts'

type LeaderboardStateType = {
  filter: number
  leaderboard: LeaderboardResponse
  setLeaderboard: (leaderboard: LeaderboardResponse) => void
  setFilter: (filter: number) => void
}

const useLeaderboardStore = create<LeaderboardStateType>((set) => ({
  leaderboard: [],
  filter: 10,
  setFilter: (filter: number) => set({ filter }),
  setLeaderboard: (leaderboard: LeaderboardResponse) => set({ leaderboard }),
}))

export { useLeaderboardStore }
