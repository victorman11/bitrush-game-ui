type WSBetType = {
  bet: string
  email: string
  id: number
  payout: string
  socketClientId: string
  userName: string
  win: false
  profit: number
}

type WSChartDataSetType = {
  labels: number[]
  data: number[]
}

export type { WSChartDataSetType, WSBetType }
