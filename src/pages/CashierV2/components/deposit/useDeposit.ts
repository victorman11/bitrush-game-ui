import { useMemo } from 'react'

import { useAuthStore } from '@/commons/stores'

const useDeposit = () => {
  const { user } = useAuthStore()

  const mainWallet = useMemo(() => {
    const wallet = user?.wallets.find(
      (wall) => wall.symbol === 'sol' && wall.blockchain === 'solana',
    )

    if (!wallet) {
      return '...'
    }

    return wallet.address
  }, [user?.wallets])

  return {
    states: {
      mainWallet,
    },
  }
}

export default useDeposit
