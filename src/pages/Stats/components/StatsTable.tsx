import envVariables from '@/commons/consts/envVariables'
import DataDisplay from '@/components/DataDisplay/DataDisplay.tsx'
import DataDisplayRow from '@/components/DataDisplay/DataDisplayRow.tsx'
import useStats from '@/pages/Stats/hooks/useStats.ts'

function StatsTable() {
  const {
    states: { stats },
  } = useStats()
  return (
    <DataDisplay className="bg-bitrush-neutral-900">
      <DataDisplayRow title="Users" value={stats.users} formatValue={false} />
      <DataDisplayRow title="Bets" value={stats.bets} formatValue={false} />
      <DataDisplayRow
        title="Liquidity"
        value={stats.liquidity}
        valueUnit=" BTC"
        fracDigits={8}
      />
      <DataDisplayRow title="Wagered" value={stats.wagered} valueUnit=" RUSH" />
      <DataDisplayRow
        title="Return to player"
        value={stats.returnedToPlayers}
        valueUnit="%"
      />
      <DataDisplayRow
        title="Referral redistribution"
        value={stats.referralRedistribution}
        valueUnit="%"
      />
      <DataDisplayRow
        title="Commission"
        value={envVariables.WITHDRAW_COMMISSION * 100}
        valueUnit="%"
      />
    </DataDisplay>
  )
}

export default StatsTable
