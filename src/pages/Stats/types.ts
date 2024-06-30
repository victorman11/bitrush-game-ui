import BigNumber from 'bignumber.js'

export type StatsResponse = {
  bets: number
  users: number
  wagered: BigNumber
  earnings: BigNumber
  referralRedistribution: BigNumber
  returnedToPlayers: BigNumber
  liquidity: BigNumber
}
