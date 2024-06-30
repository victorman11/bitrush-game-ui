import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import QueryKeys from '@/commons/consts/queryKeys.ts'
import { useAuthStore } from '@/commons/stores'
import { useDepositStore } from '@/commons/stores/depositStore'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { getDeposit } from '@/pages/Cashier/store/actions.ts'

export const DEPOSITS_PAGE_SIZE = 4

const useLastDepositsTable = () => {
  const { deposits, depositsHasMoreRows } = useDepositStore()
  const { copy } = useCopyToClipboard()
  const { isLoggedIn } = useAuthStore()

  const fetchMoreWithdrawalsMutation = useMutation({
    mutationFn: (params: { limit: number; offset: number }) =>
      getDeposit(params.limit, 0),

    mutationKey: [QueryKeys.GET_DEPOSIT],
  })

  const getMoreRows = useCallback(() => {
    const nextOffset = deposits.length
    fetchMoreWithdrawalsMutation.mutate({
      limit: nextOffset + DEPOSITS_PAGE_SIZE,
      offset: 0,
    })
  }, [deposits, fetchMoreWithdrawalsMutation])

  useEffect(() => {
    if (isLoggedIn && deposits.length === 0 && depositsHasMoreRows) {
      getMoreRows()
    }
  }, [isLoggedIn, deposits, depositsHasMoreRows, getMoreRows])

  return {
    functions: { copy, getMoreRows },
    states: { deposits, depositsHasMoreRows },
  }
}

export default useLastDepositsTable
