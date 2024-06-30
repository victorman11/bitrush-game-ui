import Divisor from '@/components/Divisor/Divisor'
import LastWithdrawalsTable from '@/components/LastWithdrawalsTableV2/LastWithdrawalsTable'

import MainWithdrawalCard from './components/MainWithdrawalCard/MainWithdrawalCard'
import OtherWalletsDepositCard from './components/OtherWalletsWithdrawalCard/OtherWalletsWithdrawalCard'

const Withdrawal = () => {
  return (
    <>
      <MainWithdrawalCard />
      <Divisor text="or" className="my-5" />
      <OtherWalletsDepositCard />
      <LastWithdrawalsTable />
    </>
  )
}

export default Withdrawal
