type GameStatusChangedEventData = 'starting' | 'playing' | 'finished'

enum GameResultTypesEnum {
  NONE = 'non_applicable',
  BET = 'bet',
}

type GameEndEventData = {
  //   afiliateGain: null;
  bet: number
  payout: number
  profit: number
  win: boolean
  type: `${GameResultTypesEnum}`
} | null

type OnChatMessageData = {
  createdAt: string
  id: string
  message: string
  room: 'EN' | 'ES' | 'PT'
  userId: number
  userName: string
}

export type { GameStatusChangedEventData, GameEndEventData, OnChatMessageData }

export { GameResultTypesEnum }
