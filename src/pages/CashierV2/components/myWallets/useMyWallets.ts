import { useMemo } from 'react'

import envVariables from '@/commons/consts/envVariables'
import { useAuthStore } from '@/commons/stores'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import useTimedVisibility from '@/hooks/useTimedVisibility'

const useMyWallets = () => {
  const { user } = useAuthStore()
  const { isMobile } = useDeviceWidth()
  const {
    visible: isSeedVisible,
    toggleVisibility,
    timeLeft,
    finished,
    running,
  } = useTimedVisibility()
  const tableColumns = isMobile ? 12 : 6

  const mainWallet = useMemo(() => {
    const wallet = user?.wallets.find(
      (wall) => wall.symbol === 'sol' && wall.blockchain === 'solana',
    )

    if (!wallet) {
      return '...'
    }

    return wallet.address
  }, [user?.wallets])

  const openOnBlockchain = () => {
    const url =
      envVariables.IS_PROD === true
        ? `https://explorer.solana.com/address/${mainWallet}`
        : `https://explorer.solana.com/address/${mainWallet}?cluster=devnet`

    window.open(url, '_blank')
  }

  const _SEEDS_MOCK = [
    'black',
    'frame',
    'gorgeous',
    'balcony',
    'touch',
    'glass',
    'learn',
    'moon',
    'sport',
    'easy',
    'white',
    'water',
    'screen',
    'reflect',
    'laser',
    'light',
    'word',
    'plant',
    'earth',
    'wood',
    'oil',
    'torch',
    'monitor',
    'throuser',
  ]
  return {
    functions: {
      openOnBlockchain,
      toggleVisibility,
    },
    states: {
      disabled: running && !finished,
      timeLeft,
      isSeedVisible,
      wallet: mainWallet,
      seeds: _SEEDS_MOCK,
      tableColumns,
    },
  }
}

export default useMyWallets
