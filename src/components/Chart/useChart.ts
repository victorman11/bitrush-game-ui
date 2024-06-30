import { HighchartsReactRefObject } from 'highcharts-react-official'
import { useMemo, useRef } from 'react'

import { useWSGameStore } from '@/commons/stores'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import { GameResultTypesEnum } from '@/services/socketTypes'

import useChartOptions from './useChartOptions'

const useChart = () => {
  const {
    gameCurrentMultiplier,
    countdown,
    chartDataSet,
    gameStatus,
    gameResults,
    currentUserPayout,
  } = useWSGameStore()
  const { userBetStatus } = useWSBetStore()
  const chartRef = useRef<HighchartsReactRefObject>(null)
  const options = useChartOptions()

  const { isDesktop } = useDeviceWidth()

  const gamePayout = useMemo(() => {
    const payout =
      gameCurrentMultiplier > -1
        ? Number(gameCurrentMultiplier).toFixed(2)
        : Number(chartDataSet.data[chartDataSet.data.length - 1] ?? 0).toFixed(
            2,
          )

    return payout
  }, [chartDataSet.data, gameCurrentMultiplier])

  const gamePayoutColor = useMemo(() => {
    // check if user did a bet and already won. Dont wait till game ends to display win lines
    if (currentUserPayout && currentUserPayout <= Number(gamePayout)) {
      return 'text-bitrush-green-500'
    }
    // check if game ended

    if (gameResults?.type === GameResultTypesEnum.BET) {
      if (gameResults.win) {
        return 'text-bitrush-green-500'
      }
      return 'text-bitrush-red-500'
    }

    return 'text-bitrush-neutral-0'
  }, [gameResults, gamePayout, currentUserPayout])

  return {
    userBetStatus,
    options,
    gameResults,
    gameStatus,
    countdown,
    gamePayout,
    isDesktop,
    gameCurrentMultiplier,
    chartRef,
    gamePayoutColor,
  }
}

export default useChart
