import Divisor from '@/components/Divisor/Divisor'
import LastDepositsTable from '@/components/LastDepositsTableV2/LastDepositsTable'

import MainDepositCard from './components/MainDepositCard'
import OtherWalletsDepositCard from './components/OtherWalletsDepositCard/OtherWalletsDepositCard'
import useDeposit from './useDeposit'

const Deposit = () => {
  const { states } = useDeposit()

  return (
    <>
      <MainDepositCard wallet={states.mainWallet} />
      <Divisor text="or" className="my-2" />
      <OtherWalletsDepositCard />
      <div className="py-2" />
      <LastDepositsTable />
    </>
  )
}

export default Deposit
