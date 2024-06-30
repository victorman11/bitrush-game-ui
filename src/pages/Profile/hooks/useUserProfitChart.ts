import { useQuery } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import * as Highcharts from 'highcharts'
import { useEffect, useMemo } from 'react'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { getUserProfitChart } from '@/pages/Profile/store/actions.ts'
import { useProfileStore } from '@/pages/Profile/store/store.ts'
import { UserProfitChartDateValue } from '@/pages/Profile/types.ts'

function renderChartOptions(
  data: UserProfitChartDateValue[],
): Highcharts.Options {
  const useData = data.map((item) => [
    new Date(item.date).getTime(),
    new BigNumber(item.value).toNumber(),
  ])
  console.log('useDate', useData)
  return {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      animation: false,
      height: 200,
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: null,
      },
      tickColor: '#56586A',
      tickWidth: 1,
      gridLineColor: '#56586A',
      lineColor: '#56586A',
      labels: {
        style: {
          color: '#56586A',
        },
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
    },
    plotOptions: {
      series: {
        animation: false,
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1,
          },
        },
        point: {
          events: {
            mouseOver: function () {
              return false
            },
          },
        },
      },
    },

    yAxis: {
      title: {
        text: null,
      },
      tickColor: '#272A3A',
      tickWidth: 1,
      gridLineColor: '#272A3A',

      labels: {
        style: {
          color: '#56586A',
        },
      },
    },

    series: [{ type: 'line', data: useData }],
  }
}

const useUserProfitChart = (userId?: number) => {
  const { user } = useAuthStore()
  const { setProfitChartValues, chartValues } = useProfileStore()

  const useUserId = userId ?? user?.id

  const { data } = useQuery({
    queryFn: () => getUserProfitChart(Number(useUserId)),
    queryKey: [QueryKeys.GET_USER_PROFIT_CHART],
    enabled: !!useUserId,
  })

  useEffect(() => {
    if (data && useUserId) {
      setProfitChartValues(useUserId, data.data.values)
    }
  }, [data, setProfitChartValues, useUserId])

  const chartOptions = useMemo(() => {
    return useUserId && chartValues[useUserId]
      ? renderChartOptions(chartValues[useUserId])
      : undefined
  }, [chartValues, useUserId])

  const hasChartData =
    useUserId && chartValues[useUserId] && chartValues[useUserId].length > 0

  return {
    states: {
      chartOptions,
      hasChartData,
    },
  }
}
export default useUserProfitChart
