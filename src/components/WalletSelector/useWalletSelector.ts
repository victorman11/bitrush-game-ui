import { useClickAway } from '@uidotdev/usehooks'
import { useCallback, useMemo, useState } from 'react'

import { useAuthStore } from '@/commons/stores'
import { useDepositStore } from '@/commons/stores/depositStore'
import { Wallet } from '@/commons/types/auth'
type WalletSelectorProps = {
  onSelect(wallet: Wallet): void
}

const useWalletSelector = (props: WalletSelectorProps) => {
  const { minimumDeposits } = useDepositStore()
  const { user } = useAuthStore()

  const wallets = useMemo(() => {
    const filteredData = user?.wallets
      .filter((item) =>
        Object.prototype.hasOwnProperty.call(minimumDeposits, item.symbol),
      )
      .filter(
        (wallet) =>
          wallet.blockchain.toLowerCase() !== 'solana' ||
          wallet.symbol.toLowerCase() !== 'usdc',
      )

    return filteredData
  }, [minimumDeposits, user?.wallets])

  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const onChangeWallet = useCallback(
    (wallet: Wallet) => {
      setSelectedWallet(wallet)
      setIsOpen(false)
      props.onSelect(wallet)
    },
    [props],
  )

  const ref = useClickAway(() => {
    setIsOpen(false)
  })

  return {
    ref,
    functions: {
      toggle,
      onChangeWallet,
    },
    states: {
      isOpen,
      selectedWallet,
      wallets,
    },
  }
}

export default useWalletSelector
