import { create } from 'zustand'

type Fee = {
  type: 'fixed' | 'percentage'
  value: number
}

enum WalletSymbols {
  SOL = 'sol',
  USDT = 'usdt',
  USDC = 'usdc',
  ETH = 'eth',
}

export type WalletSymbolsValue = `${WalletSymbols}`

export type SolanaNetwork = {
  kind: 'solana'
  symbols: Exclude<WalletSymbolsValue, 'eth'>
}

export type EthereumNetwork = {
  kind: 'ethereum'
  symbols: Exclude<WalletSymbolsValue, 'sol'>
}

export type Networks = SolanaNetwork | EthereumNetwork

// export type CurrencyFees<Symbols extends WalletSymbolsValue> = {
export type CurrencyFees = {
  // ethereum: {
  //   [S in Symbols as EthereumNetwork['symbols']]: {
  //     gas?: Fee
  //     exchange?: Fee
  //   }
  // }
  // solana: {
  //   [S in Symbols as SolanaNetwork['symbols']]: {
  //     gas?: Fee
  //     exchange?: Fee
  //   }
  // }
  [network: string]: {
    [currency: string]: {
      gas?: Fee
      exchange?: Fee
    }
  }
}

const initialState: CurrencyFees = {
  ethereum: {
    eth: {},
    usdc: {},
    usdt: {},
  },
  solana: {
    sol: {},
    usdc: {},
    usdt: {},
  },
}

type UseWithdrawalSocketStore = {
  data: typeof initialState
  setFees: (data: typeof initialState) => void
}

export const useWithdrawalSocketStore = create<UseWithdrawalSocketStore>(
  (set) => ({
    data: { ...initialState },
    setFees: (data) => set(() => ({ data })),
  }),
)
