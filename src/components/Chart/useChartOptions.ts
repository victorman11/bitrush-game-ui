import { useMemo } from 'react'

import { useWSGameStore } from '@/commons/stores'
import {
  getChartDesktopRatio,
  getChartMobileRatio,
} from '@/helpers/getChartRatio'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import { useWindowSize } from '@/hooks/useWindowSize'
import { GameResultTypesEnum } from '@/services/socketTypes'

const useChartOptions = () => {
  const {
    chartDataSet,
    gameResults,
    currentUserPayout,
    gameCurrentMultiplier,
  } = useWSGameStore()
  const { isMobile } = useDeviceWidth()
  const { height } = useWindowSize()

  const gamePayout = useMemo(() => {
    const payout =
      gameCurrentMultiplier > -1
        ? Number(gameCurrentMultiplier).toFixed(2)
        : Number(chartDataSet.data[chartDataSet.data.length - 1] ?? 0).toFixed(
            2,
          )

    return Number(payout)
  }, [chartDataSet.data, gameCurrentMultiplier])

  const heightRatio =
    (isMobile ? getChartMobileRatio() : getChartDesktopRatio()) * height

  const options = useMemo(() => {
    const baseChartOptions = {
      chart: {
        type: 'spline',
        marginRight: 10,
        backgroundColor: 'transparent',
        height: heightRatio,
      },
      title: {
        text: '',
      },
      subTitle: {
        text: '',
      },

      xAxis: {
        visible: false,
        // type: "linear",
        width: 400,
        type: 'logarithmic',
        tickInterval: 1,
        tickPositions: chartDataSet.data.map((number) => {
          const teste = Math.ceil(number * 10) / 10
          return Math.log10(teste)
        }),
      },

      yAxis: {
        startsFromZero: false,
        type: 'linear',
        title: '',
        tickInterval: 0.1,
        tickColor: '#272A3A',
        tickWidth: 1,
        gridLineColor: '#272A3A',
        softMax: 2,
        softMin: 1,
        startOnTick: false,
        minRange: 1,
        min: 1,

        labels: {
          format: '{value}x',
        },
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
        followPointer: false,
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          lineColor: '#FFBC2D',
          marker: {
            enabled: false,
          },
          allowPointSelect: false,
          pointStart: 0,

          stickyTracking: false,
          series: {
            shadow: true,
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          data: [
            ...chartDataSet.data,
            {
              y: chartDataSet.data[chartDataSet.data.length - 1],
              marker: {
                symbol: 'circle',
                width: 60, // Width of the ellipse
                height: 60, // Height of the ellipse
                fillColor: 'yellow', // Fill color
                lineColor: 'red', // Border color
                lineWidth: 2, // Border width
              },
            },
          ],
          animation: {
            duration: 2000,
          },
          shadow: {
            color: '#FFCA5A',
            width: 10,
            opacity: 1,
            offsetX: 0,
            offsetY: 0,
          },
        },
      ],
    }
    const winConfigChart = {
      ...baseChartOptions,
      plotOptions: {
        ...baseChartOptions.plotOptions,
        spline: {
          ...baseChartOptions.plotOptions.spline,
          lineColor: '#34C759',
        },
      },
      series: [
        {
          ...baseChartOptions.series[0],
          shadow: {
            ...baseChartOptions.series[0].shadow,
            color: '#5DD27A',
          },
        },
      ],
    }

    const loseConfigChart = {
      ...baseChartOptions,
      plotOptions: {
        ...baseChartOptions.plotOptions,
        spline: {
          ...baseChartOptions.plotOptions.spline,
          lineColor: '#FF3B30',
        },
      },
      series: [
        {
          ...baseChartOptions.series[0],
          shadow: {
            ...baseChartOptions.series[0].shadow,
            color: '#FF6259',
          },
        },
      ],
    }

    const nonApplicableConfigChart = {
      ...baseChartOptions,
      plotOptions: {
        ...baseChartOptions.plotOptions,
        spline: {
          ...baseChartOptions.plotOptions.spline,
          lineColor: '#FFFFFF',
        },
      },
      series: [
        {
          ...baseChartOptions.series[0],
          shadow: {
            ...baseChartOptions.series[0].shadow,
            color: '#E9EAF0',
          },
        },
      ],
    }

    if (gameResults?.type === GameResultTypesEnum.NONE) {
      return nonApplicableConfigChart
    }

    if (currentUserPayout && currentUserPayout <= gamePayout) {
      return winConfigChart
    }
    if (gameResults?.type === GameResultTypesEnum.BET) {
      if (gameResults.win) {
        return winConfigChart
      }
      return loseConfigChart
    }

    return baseChartOptions
  }, [gameResults, chartDataSet, currentUserPayout, gamePayout, heightRatio])

  return options
}

export default useChartOptions
