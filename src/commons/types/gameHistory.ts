type GameHistoryType = {
  uuid: string
  bet: string
  bust: string
  profit: string
  hash: string
  gameHash: string
  finished: boolean
  createdAt: string
  updatedAt: string
}

type UserGameHistoryType = {
  uuid: string
  bet: string
  bust: string
  payout: string
  profit: string
  hash: string
  finished: boolean
  win: boolean
}

export type { GameHistoryType, UserGameHistoryType }
