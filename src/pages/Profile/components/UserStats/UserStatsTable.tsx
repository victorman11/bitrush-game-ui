import DataDisplay from '@/components/DataDisplay/DataDisplay.tsx'
import DataDisplayRow from '@/components/DataDisplay/DataDisplayRow.tsx'
import UserStatsHeader from '@/pages/Profile/components/UserStats/UserStatsHeader.tsx'
import useUserStatsTable from '@/pages/Profile/hooks/useUserStatsTable.ts'

type UserStatsTableProps = {
  userId?: number
  withHeader?: boolean
}

function UserStatsTable({ userId, withHeader }: UserStatsTableProps) {
  const {
    states: { userStats },
  } = useUserStatsTable(userId)

  return (
    <>
      {!!userStats && (
        <>
          {!!withHeader && (
            <UserStatsHeader
              userName={userStats.user.userName}
              joinedAt={userStats.user.joinedAt}
            />
          )}
          <DataDisplay className="border-0 bg-transparent px-0 py-0 lg:border lg:border-bitrush-blue-700 lg:bg-bitrush-neutral-900 lg:px-3 lg:py-2">
            <DataDisplayRow title="Games played" value={userStats.gamePlayed} />
            <DataDisplayRow
              title="Total wagered"
              value={userStats.totalBet}
              valueUnit=" RUSH"
            />
            <DataDisplayRow
              title="Net profit"
              value={userStats.netProfit}
              valueUnit=" RUSH"
              coloredValue
            />
            <DataDisplayRow
              title="Profit all time high"
              value={userStats.profitAllTimeHigh}
              valueUnit=" RUSH"
              coloredValue
            />
            <DataDisplayRow
              title="Profit all time low"
              value={userStats.profitAllTimeLow}
              valueUnit=" RUSH"
              coloredValue
            />
          </DataDisplay>
        </>
      )}
    </>
  )
}

export default UserStatsTable
