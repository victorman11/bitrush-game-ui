import { create } from 'zustand'

import { GameHistoryType, UserGameHistoryType } from '../types/gameHistory'

type GameHistoryStateType = {
  userGameHistory: UserGameHistoryType[]
  gameHistory: GameHistoryType[]
  setGameHistory: (gameHistory: GameHistoryType[]) => void
  setUserGameHistory: (userGameHistory: UserGameHistoryType[]) => void
  showLastPayoutOverlay: boolean
  setShowLastPayoutOverlay: (showLastPayoutOverlay: boolean) => void
}

const useGameHistoryStore = create<GameHistoryStateType>((set) => ({
  gameHistory: [],
  userGameHistory: [],
  showLastPayoutOverlay: false,
  setGameHistory: (gameHistory: GameHistoryType[]) => set({ gameHistory }),
  setUserGameHistory: (userGameHistory: UserGameHistoryType[]) =>
    set({ userGameHistory }),
  setShowLastPayoutOverlay: (showLastPayoutOverlay: boolean) =>
    set({ showLastPayoutOverlay }),
}))

export { useGameHistoryStore }
