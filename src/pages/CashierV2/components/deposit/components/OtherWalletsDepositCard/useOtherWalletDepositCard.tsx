import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { useDepositStore } from '@/commons/stores/depositStore'
import { Wallet } from '@/commons/types/auth'
import { copyStringToClipboard } from '@/helpers/clipboard'
import { objectsAreEqual } from '@/helpers/objectHelpers'
import { getMinimumDeposits } from '@/pages/Cashier/store/actions'
import { MinimumDeposit } from '@/pages/Cashier/types/apiResponse'

const useOtherWalletDepositCard = () => {
  const { isLoggedIn } = useAuthStore()
  const { minimumDeposits } = useDepositStore()
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)

  const onSelect = useCallback((wallet: Wallet) => {
    setSelectedWallet(wallet)
  }, [])

  const { user } = useAuthStore()

  const address = useMemo(() => {
    if (selectedWallet && selectedWallet.symbol && user?.wallets) {
      const foundWallet = user.wallets.find((wall) =>
        objectsAreEqual<Wallet>(wall, selectedWallet),
      )

      if (!foundWallet) {
        return '...'
      }
      return foundWallet.address
    }
    return '...'
  }, [user, selectedWallet])

  const minimumDeposit = useMemo(() => {
    if (!selectedWallet?.name) {
      return '10 USD in corresponding currency'
    }
    const name = selectedWallet?.symbol as keyof MinimumDeposit

    const wallet = minimumDeposits[name] ? minimumDeposits[name] : null

    if (wallet) {
      const minimum = wallet.minimum
      const converted = wallet.converted

      return `${minimum.amount} ${minimum.symbol.toLocaleUpperCase()} (${
        converted.amount
      } ${converted.symbol.toLocaleUpperCase()})`
    }

    return '10 USD in corresponding currency'
  }, [selectedWallet, minimumDeposits])

  const { isLoading } = useQuery({
    queryFn: () => getMinimumDeposits(),
    queryKey: [QueryKeys.GET_MINIMUM_DEPOSITS],
    enabled: isLoggedIn,
    staleTime: 0,
  })

  const handleCopyWalletAddress = (hash: string) => {
    copyStringToClipboard(hash, 'Wallet address has been copied!')
  }

  const disabled = useMemo(() => {
    return isLoading || !selectedWallet
  }, [isLoading, selectedWallet])

  return {
    functions: {
      handleCopyWalletAddress,
      onSelect,
    },
    states: {
      user,
      address,
      selectedWallet,
      minimumDeposit,
      isLoading,
      disabled,
    },
  }
}

export default useOtherWalletDepositCard
