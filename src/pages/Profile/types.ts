import BigNumber from 'bignumber.js'

export type UserStatsResponse = {
  gamePlayed: number
  totalProfit: BigNumber
  totalBet: BigNumber
  netProfit: BigNumber
  profitAllTimeHigh: BigNumber
  profitAllTimeLow: BigNumber
  user: {
    id: number
    userName: string
    joinedAt: Date
  }
}

export type UserOverviewResponse = {
  userId: number
  deposits: BigNumber
  withdrawals: BigNumber
  invested: BigNumber
  divested: BigNumber
  profit: BigNumber
  balance: BigNumber
}

export type UserProfitChartDateValue = {
  date: Date
  value: BigNumber
}

export type UserProfitChartResponse = {
  startData: Date
  endData: Date
  values: UserProfitChartDateValue[]
}
