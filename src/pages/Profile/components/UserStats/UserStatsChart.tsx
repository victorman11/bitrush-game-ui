import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import useUserProfitChart from '@/pages/Profile/hooks/useUserProfitChart.ts'

type UserStatsChartProps = {
  userId?: number
}

function UserStatsChart({ userId }: UserStatsChartProps) {
  const {
    states: { chartOptions, hasChartData },
  } = useUserProfitChart(userId)
  return hasChartData ? (
    <div>
      <div className="typography-sm mb-3 text-white">
        Cumulative net profit over the time
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  ) : (
    <></>
  )
}

export default UserStatsChart
