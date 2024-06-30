import { create } from 'zustand'

import { BetData } from '@/pages/Home/components/LiveBet/schema'

import { WSBetType } from '../types/websocket'

type UserBetStatusType =
  | 'betEmpty'
  | 'betPending'
  | 'betDone'
  | 'betInProgress'
  | 'betStopped'
  | 'betCancelled'

type useWSBetStoreType = {
  userBet: BetData | null
  userBetNextRound: BetData | null
  userBetStatus: UserBetStatusType
  bets: WSBetType[]
  betAllowed: boolean
  betDone: boolean
  resetBets: () => void
  setBets: (bets: WSBetType[]) => void
  setBetDone: (betDone: boolean) => void
  setBetAllowed: (betAllowed: boolean) => void
  setUserBet: (userBet: BetData | null) => void
  setUserBetNextRound: (userBetNextRound: BetData | null) => void
  setUserBetStatus: (userBetStatus: UserBetStatusType) => void
}

const useWSBetStore = create<useWSBetStoreType>((set) => ({
  userBet: null,
  userBetNextRound: null,
  bets: [],
  userBetStatus: 'betEmpty',
  betAllowed: false,
  betDone: false,
  resetBets: () => set({ bets: [] }),
  setBets: (bets: WSBetType[]) => set({ bets }),
  setBetDone: (betDone: boolean) => set({ betDone }),
  setBetAllowed: (betAllowed: boolean) => set({ betAllowed }),
  setUserBet: (userBet: BetData | null) => set({ userBet }),
  setUserBetNextRound: (userBetNextRound: BetData | null) =>
    set({ userBetNextRound }),
  setUserBetStatus: (userBetStatus: UserBetStatusType) => {
    return set({ userBetStatus })
  },
}))

export { useWSBetStore }
