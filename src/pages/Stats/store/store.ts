import BigNumber from 'bignumber.js'
import { create } from 'zustand'

import { StatsResponse } from '@/pages/Stats/types.ts'

type StatsStateType = {
  stats: StatsResponse
  setStats: (stats: StatsResponse) => void
}

const useStatsStore = create<StatsStateType>((set) => ({
  stats: {
    bets: 0,
    users: 0,
    liquidity: new BigNumber(0),
    wagered: new BigNumber(0),
    earnings: new BigNumber(0),
    referralRedistribution: new BigNumber(0),
    returnedToPlayers: new BigNumber(0),
  },
  setStats: (stats: StatsResponse) => set({ stats }),
}))

export { useStatsStore }
