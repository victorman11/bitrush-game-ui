import UserStatsChart from '@/pages/Profile/components/UserStats/UserStatsChart.tsx'
import UserStatsTable from '@/pages/Profile/components/UserStats/UserStatsTable.tsx'

function UserStats() {
  return (
    <div className="w-full py-4">
      <div className="mx-auto flex max-w-xl flex-col gap-5 md:max-w-2xl">
        <UserStatsTable />
        <UserStatsChart />
      </div>
    </div>
  )
}

export default UserStats
