import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import {
  getTotalAmountWithdraw,
  getWithdrawalV2,
} from '@/pages/CashierV2/store/actions'

const useLastWithdrawalsTable = () => {
  const { copy } = useCopyToClipboard()
  const { isLoggedIn } = useAuthStore()
  const { isMobile } = useDeviceWidth()

  const { data: withdrawals } = useQuery({
    queryFn: () => getWithdrawalV2(),
    queryKey: [QueryKeys.GET_WITHDRAWAL_V2],
    enabled: isLoggedIn,
  })

  const { data: totalDeposits } = useQuery({
    queryFn: () => getTotalAmountWithdraw(),
    queryKey: [QueryKeys.GET_TOTAL_WITHDRAW_V2],
    enabled: isLoggedIn,
  })

  const handleTotalAmount = () => {
    if (totalDeposits?.withdraw) {
      const { symbol, total } = totalDeposits.withdraw
      return `${total.toFixed(2)} ${symbol.toUpperCase()}`
    }
    return '0 USDC'
  }

  return {
    functions: { copy, getMoreRows: () => null },
    states: {
      withdrawals: withdrawals?.data,
      withdrawalsTotal: '0',
      withdrawalsHasMoreRows: false,
      totalWithdraws: handleTotalAmount(),
      isMobile,
    },
  }
}

export default useLastWithdrawalsTable
