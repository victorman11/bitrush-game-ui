import { create } from 'zustand'

import { Deposit, MinimumDeposit } from '@/pages/Cashier/types/apiResponse'

type DepositStore = {
  deposits: Array<Deposit>
  depositsHasMoreRows: boolean
  setDeposits(deposits: Array<Deposit>): void
  minimumDeposits: MinimumDeposit
  setMinimumDeposits(minimumDeposits: MinimumDeposit): void
}

const initialState = {
  minimumDeposits: {
    btc: {
      minimum: {
        symbol: 'btc',
        amount: 0,
      },
      converted: {
        symbol: 'usd',
        amount: 0,
      },
    },
    eth: {
      minimum: {
        symbol: 'btc',
        amount: 0,
      },
      converted: {
        symbol: 'usd',
        amount: 0,
      },
    },
    usdc: {
      minimum: {
        symbol: 'usdc',
        amount: 0,
      },
      converted: {
        symbol: 'usd',
        amount: 0,
      },
    },
    usdt: {
      minimum: {
        symbol: 'usdt',
        amount: 0,
      },
      converted: {
        symbol: 'usd',
        amount: 0,
      },
    },
    sol: {
      minimum: {
        symbol: 'sol',
        amount: 0,
      },
      converted: {
        symbol: 'usd',
        amount: 0,
      },
    },
  },
}

const useDepositStore = create<DepositStore>((set) => ({
  deposits: [],
  depositsHasMoreRows: true,
  setDeposits: (deposits: Array<Deposit>) => set({ deposits }),

  minimumDeposits: initialState.minimumDeposits,
  setMinimumDeposits: (minimumDeposits: MinimumDeposit) =>
    set({ minimumDeposits }),
}))

export { useDepositStore }
