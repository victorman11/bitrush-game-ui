import { useMemo } from 'react'

import { useWSGameStore } from '@/commons/stores'
import { GameResultTypesEnum } from '@/services/socketTypes'

const useResultDialog = () => {
  const { gameCurrentMultiplier, gameResults } = useWSGameStore()

  const textColor = useMemo(() => {
    if (gameResults?.type === GameResultTypesEnum.BET) {
      return gameResults?.win ? 'bitrush-green-500' : 'bitrush-red-500'
    }

    return 'bitrush-neutral-0'
  }, [gameResults])

  const shadowColor = useMemo(() => {
    if (gameResults?.type === GameResultTypesEnum.BET) {
      return gameResults?.win ? 'text-shadow-green' : 'text-shadow-red'
    }

    return 'text-shadow-white'
  }, [gameResults])

  const borderColor = useMemo(() => {
    return 'bitrush-blue-700'
  }, [])

  const data = useMemo(() => {
    if (gameResults?.type === GameResultTypesEnum.BET) {
      return {
        title: gameResults?.win ? 'YOU WIN' : 'YOU LOSE',
        bet: `${gameResults?.bet} RUSH`,
        payout: `${gameResults?.payout}x`,
        result: `${gameCurrentMultiplier}x`,
        profit: `${gameResults?.profit} RUSH`,
      }
    }

    return {
      title: 'CRASHED!',
      bet: '-',
      payout: '-',
      result: `${gameCurrentMultiplier}x`,
      profit: '-',
    }
  }, [gameCurrentMultiplier, gameResults])

  return {
    visible: !!gameResults,
    data,
    textColor,
    borderColor,
    shadowColor,
  }
}

export default useResultDialog
