import { create } from 'zustand'

import {
  GameEndEventData,
  GameStatusChangedEventData,
} from '@/services/socketTypes'

import { WSChartDataSetType } from '../types/websocket'

type useWSGameStoreType = {
  chartDataSet: WSChartDataSetType
  gameCurrentMultiplier: number
  countdown: number
  currentUserPayout: number | null
  gameResults: GameEndEventData
  lastGameResult: 'win' | 'lose' | null
  gameStatus: GameStatusChangedEventData
  setGameCurrentMultiplier: (gameCurrentMultiplier: number) => void
  setCountdown: (countdown: number) => void
  setChartDataSet: (wsData: number[]) => void
  setGameStatus: (gameStatus: GameStatusChangedEventData) => void
  setLastGameResult: (result: 'win' | 'lose' | null) => void
  setCurrentUserPayout: (currentUserPayout: number | null) => void
  setGameResults: (gameResults: GameEndEventData) => void
  resetGame(): void
}

const initialChartData = {
  labels: [0, 1],
  data: [0, 1],
}

const useWSGameStore = create<useWSGameStoreType>((set) => ({
  chartDataSet: initialChartData,
  gameCurrentMultiplier: -1,
  countdown: -1,
  gameResults: null,
  lastGameResult: null,
  gameStatus: 'playing',
  currentUserPayout: null,
  setGameStatus: (gameStatus: GameStatusChangedEventData) =>
    set({ gameStatus }),
  resetGame: () =>
    set({
      chartDataSet: initialChartData,
      gameCurrentMultiplier: -1,
      gameResults: null,
    }),

  setGameCurrentMultiplier: (gameCurrentMultiplier: number) =>
    set({ gameCurrentMultiplier }),
  setCountdown: (countdown: number) => set({ countdown }),
  setCurrentUserPayout: (currentUserPayout: number | null) =>
    set({ currentUserPayout }),

  setGameResults: (gameResults: GameEndEventData) => set({ gameResults }),
  setLastGameResult: (lastGameResult: 'win' | 'lose' | null) =>
    set({ lastGameResult }),
  setChartDataSet: (wsData: number[]) =>
    set((state) => ({
      chartDataSet: {
        ...state.chartDataSet,
        labels: [...state.chartDataSet.labels, wsData[0]],
        data: [...state.chartDataSet.data, wsData[1]],
      },
    })),
}))

export { useWSGameStore }
