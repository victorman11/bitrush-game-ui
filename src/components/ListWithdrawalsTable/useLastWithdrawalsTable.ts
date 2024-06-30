import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { useWithdrawalStore } from '@/commons/stores/withdrawalStore.ts'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import {
  getWithdrawal,
  getWithdrawalTotal,
} from '@/pages/Cashier/store/actions.ts'

const WITHDRAWALS_PAGE_SIZE = 4

const useLastWithdrawalsTable = () => {
  const { withdrawals, withdrawalsTotal, withdrawalsHasMoreRows } =
    useWithdrawalStore()
  const { copy } = useCopyToClipboard()
  const { isLoggedIn } = useAuthStore()

  const fetchMoreWithdrawalsMutation = useMutation({
    mutationFn: (params: { limit: number; offset: number }) =>
      getWithdrawal(params.limit, 0),
    mutationKey: [QueryKeys.GET_WITHDRAWAL],
  })

  const getMoreRows = useCallback(() => {
    const nextOffset = withdrawals.length
    fetchMoreWithdrawalsMutation.mutate({
      limit: nextOffset + WITHDRAWALS_PAGE_SIZE,
      offset: 0,
    })
  }, [fetchMoreWithdrawalsMutation, withdrawals])

  useEffect(() => {
    if (isLoggedIn && withdrawals.length === 0 && withdrawalsHasMoreRows) {
      getMoreRows()
    }
  }, [isLoggedIn, withdrawals, withdrawalsHasMoreRows, getMoreRows])

  useQuery({
    queryFn: () => getWithdrawalTotal(),
    queryKey: [QueryKeys.GET_WITHDRAWAL_TOTAL],
    enabled: isLoggedIn,
    staleTime: 0,
  })

  return {
    functions: { copy, getMoreRows },
    states: { withdrawals, withdrawalsTotal, withdrawalsHasMoreRows },
  }
}

export default useLastWithdrawalsTable
