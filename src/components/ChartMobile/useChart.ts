import { HighchartsReactRefObject } from 'highcharts-react-official'
import { useMemo, useRef } from 'react'

import { useWSGameStore } from '@/commons/stores'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'

import useChartOptions from './useChartOptions'

const useChart = () => {
  const {
    gameCurrentMultiplier,
    countdown,
    chartDataSet,
    gameStatus,
    gameResults,
  } = useWSGameStore()
  const { userBetStatus } = useWSBetStore()
  const chartRef = useRef<HighchartsReactRefObject>(null)
  const options = useChartOptions()

  const gamePayout = useMemo(() => {
    return gameCurrentMultiplier > -1
      ? Number(gameCurrentMultiplier).toFixed(2)
      : Number(chartDataSet.data[chartDataSet.data.length - 1] ?? 0).toFixed(2)
  }, [chartDataSet.data, gameCurrentMultiplier])

  const gamePayoutColor = useMemo(() => {
    if (gameResults?.bet) {
      if (gameResults.win) {
        return 'text-bitrush-green-500'
      }
      return 'text-bitrush-red-500'
    }
    return 'text-bitrush-neutral-0'
  }, [gameResults])

  return {
    userBetStatus,
    options,
    gameResults,
    gameStatus,
    countdown,
    gamePayout,
    gameCurrentMultiplier,
    chartRef,
    gamePayoutColor,
  }
}

export default useChart
