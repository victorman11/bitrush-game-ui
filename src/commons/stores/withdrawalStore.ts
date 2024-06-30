import { create } from 'zustand'

import { Withdrawal, WithdrawalsTotal } from '@/pages/Cashier/types/apiResponse'

type WithdrawalStore = {
  withdrawals: Array<Withdrawal>
  withdrawalsTotal: WithdrawalsTotal
  withdrawalsHasMoreRows: boolean
  setWithdrawals(withdrawals: Array<Withdrawal>): void
  refreshWithdrawals(): void
}

const useWithdrawalStore = create<WithdrawalStore>((set) => ({
  withdrawals: [],
  withdrawalsHasMoreRows: true,
  withdrawalsTotal: {
    bits: '0',
    btc: '0',
  },
  setWithdrawals: (withdrawals: Array<Withdrawal>) => set({ withdrawals }),
  refreshWithdrawals: () =>
    set({ withdrawals: [], withdrawalsHasMoreRows: true }),
}))

export { useWithdrawalStore }
