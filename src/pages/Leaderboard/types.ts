import BigNumber from 'bignumber.js'

export type LeaderboardItem = {
  id: number
  userName: string
  wagered: BigNumber
  profit: BigNumber
  profitAth: BigNumber
  profitAtl: BigNumber
}

export type LeaderboardResponse = LeaderboardItem[]
