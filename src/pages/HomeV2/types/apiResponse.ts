import { Wallet } from '@/commons/types/auth'
import {
  GameHistoryType,
  UserGameHistoryType,
} from '@/commons/types/gameHistory'

type MeResponseType = {
  data: {
    affiliateCode: string
    id: number
    userName: string
    email: string
    referralToken: number
    bits: number
    avatarUrl?: string
    badgeUrl: string
    hasDeposit: boolean
    joinedAt: Date
    wallets: Array<Wallet>
    isCountryDisclaimer: boolean
    balance: {
      gaming_wallet: { bits: number }
      hot_wallet: { [network: string]: { [currency: string]: number } }
    }
  }
}

type GameHistoryResponseType = {
  data: GameHistoryType[]
}

type UserGameHistoryResponseType = {
  data: UserGameHistoryType[]
}

export type {
  MeResponseType,
  GameHistoryResponseType,
  UserGameHistoryResponseType,
}
