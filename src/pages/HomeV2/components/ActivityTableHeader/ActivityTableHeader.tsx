import { useEffect, useState } from 'react'

import { useWSBetStore } from '@/commons/stores/useWSBetStore'

type ActivityInfo = {
  totalBetsAmount: number
  totalWinners: number
  totalPlayers: number
}

const initActivityInfo = {
  totalBetsAmount: 0,
  totalWinners: 0,
  totalPlayers: 0,
}

const ActivityTableHeader = () => {
  const { bets } = useWSBetStore()
  const [state, setState] = useState<ActivityInfo>(initActivityInfo)

  useEffect(() => {
    if (!bets.length) {
      return setState(initActivityInfo)
    }

    let totalBetsAmount = 0
    let totalWinners = 0

    bets.forEach((bet) => {
      totalBetsAmount = totalBetsAmount + Number(bet.bet)
      if (bet.win) {
        totalWinners += 1
      }
    })

    setState({
      totalBetsAmount,
      totalPlayers: bets.length,
      totalWinners,
    })
  }, [bets])

  const handleWinnersPercentage = () => {
    if (!state.totalWinners || !state.totalPlayers) {
      return 0
    }
    return ((state.totalWinners / state.totalPlayers) * 100).toFixed(0)
  }

  return (
    <div className="flex flex-row gap-4">
      <div>
        <span className="typography-xs font-bold ">{state.totalPlayers}</span>
        <span className="typography-xs font-light">
          {' '}
          {state.totalPlayers === 1 ? 'Player' : 'Players'}
        </span>
      </div>
      <div>
        <span className="typography-xs font-bold ">
          {state.totalBetsAmount}
        </span>
        <span className="typography-xs font-light"> RUSH</span>
      </div>
      <div>
        <span className="typography-xs font-bold text-bitrush-green-500">
          {handleWinnersPercentage()}% won
        </span>
      </div>
    </div>
  )
}

export default ActivityTableHeader
