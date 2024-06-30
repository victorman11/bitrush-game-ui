import DataDisplay from '@/components/DataDisplay/DataDisplay.tsx'
import DataDisplayRow from '@/components/DataDisplay/DataDisplayRow.tsx'
import useUserOverview from '@/pages/Profile/hooks/useUserOverview.ts'

function UserOverview() {
  const {
    states: { userOverview },
  } = useUserOverview()
  return (
    <div className="w-full py-4">
      <div className="mx-auto flex max-w-xl flex-col gap-5 text-bitrush-neutral-100  md:max-w-2xl">
        {userOverview && (
          <DataDisplay className="gradient-card lg:bg-bitrush-neutral-900">
            <DataDisplayRow
              title="Deposits"
              value={userOverview.deposits}
              valueUnit=" BTC"
              fracDigits={8}
              className="py-2 lg:py-0"
            />
            <DataDisplayRow
              title="Withdrawals"
              value={userOverview.withdrawals}
              valueUnit=" BTC"
              fracDigits={8}
              className="py-2 lg:py-0"
            />
            <DataDisplayRow
              title="Invested in bankroll"
              value={userOverview.invested}
              valueUnit=" RUSH"
              coloredValue
              className="py-2 lg:py-0"
            />
            <DataDisplayRow
              title="Divested from bankroll"
              value={userOverview.divested}
              valueUnit=" RUSH"
              coloredValue
              className="py-2 lg:py-0"
            />
            <DataDisplayRow
              title="Game profit"
              value={userOverview.profit}
              valueUnit=" RUSH"
              coloredValue
              className="py-2 lg:py-0"
            />
            <DataDisplayRow
              title="Balance"
              value={userOverview.balance}
              valueUnit=" RUSH"
              coloredValue
              className="py-2 lg:py-0"
            />
          </DataDisplay>
        )}
      </div>
    </div>
  )
}

export default UserOverview
