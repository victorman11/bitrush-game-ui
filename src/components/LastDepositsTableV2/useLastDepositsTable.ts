import { useQuery } from '@tanstack/react-query'

import QueryKeys from '@/commons/consts/queryKeys.ts'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import {
  getDeposit,
  getTotalAmountDeposit,
} from '@/pages/CashierV2/store/actions'

export const DEPOSITS_PAGE_SIZE = 4

const useLastDepositsTable = () => {
  const { copy } = useCopyToClipboard()

  const { data: deposits } = useQuery({
    queryFn: () => getDeposit(),
    queryKey: [QueryKeys.GET_DEPOSIT_V2],
  })

  const { data: totalDeposits } = useQuery({
    queryFn: () => getTotalAmountDeposit(),
    queryKey: [QueryKeys.GET_TOTAL_DEPOSIT_V2],
  })

  const handleTotalAmount = () => {
    if (totalDeposits?.deposit) {
      const { symbol, total } = totalDeposits.deposit
      return `${total.toFixed(2)} ${symbol.toUpperCase()}`
    }
    return '0 USDC'
  }

  return {
    functions: { copy },
    states: {
      deposits: deposits?.data,
      depositsHasMoreRows: false,
      totalDeposits: handleTotalAmount(),
    },
  }
}

export default useLastDepositsTable
