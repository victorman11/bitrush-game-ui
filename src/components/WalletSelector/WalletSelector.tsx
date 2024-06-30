import { AnimatePresence, motion } from 'framer-motion'
import { FaCaretDown, FaCheck } from 'react-icons/fa6'

import { Wallet } from '@/commons/types/auth'

import RenderIf from '../RenderIf/RenderIf'
import { BlockchainName } from './BlockchainName'
import useWalletSelector from './useWalletSelector'

type WalletSelectorProps = {
  label: string
  placeholder?: string
  onSelect(wallet: Wallet): void
}

const WalletSelector = (props: WalletSelectorProps) => {
  const { ref, states, functions } = useWalletSelector(props)

  const handleWalletSelected = () => {
    if (states.selectedWallet?.name) {
      const { name, symbol } = states.selectedWallet
      return `${name} (${symbol.toUpperCase()}) `
    }

    if (props.placeholder) {
      return props.placeholder
    }

    return ''
  }

  return (
    <div className="flex flex-1 flex-row items-center">
      <div className="border border-bitrush-blue-700 bg-bitrush-neutral-800 px-3 py-2 ">
        <span className="font-base typography-xs text-bitrush-blue-100">
          {props.label}
        </span>
      </div>
      <div className="relative flex-1 border border-bitrush-blue-700 bg-bitrush-neutral-800 px-3 py-2">
        <div className="flex flex-row items-center">
          {!!states.selectedWallet?.symbol && (
            <img
              src={`wallets/${states.selectedWallet.symbol}.svg`}
              className="mr-2"
              alt="Wallet image"
            />
          )}

          <p
            className={`font-base typography-xs flex w-full flex-row leading-6 ${
              states.selectedWallet?.name
                ? ' text-bitrush-blue-100'
                : ' text-bitrush-blue-700'
            }`}
            onClick={functions.toggle}
          >
            {handleWalletSelected()}
            <BlockchainName wallet={states.selectedWallet} />
          </p>
        </div>
        <div
          className="pointer-cursor absolute inset-y-0 right-0 flex items-center px-2 text-white"
          onClick={functions.toggle}
        >
          <FaCaretDown className="typography-xs text-bitrush-blue-600" />
        </div>

        <AnimatePresence>
          {states.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 right-0 top-11 z-10 w-full border border-bitrush-blue-700 bg-bitrush-neutral-800"
              ref={ref as React.Ref<HTMLDivElement>}
            >
              {states.wallets?.map((wallet) => {
                const isSelected =
                  states.selectedWallet?.symbol === wallet.symbol &&
                  states.selectedWallet?.blockchain === wallet.blockchain
                return (
                  <div
                    key={`${wallet.symbol}-${wallet.blockchain}`}
                    className={`w-full cursor-pointer px-3 py-1 ${
                      isSelected ? 'bg-bitrush-blue-600-opacity' : ''
                    }`}
                    onClick={() => functions.onChangeWallet(wallet as Wallet)}
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src={`wallets/${wallet.symbol}.svg`}
                        className="mr-2"
                        alt="wallet icon"
                      />
                      <div className="flex-1">
                        <p className="typography-xs font-light text-bitrush-blue-100">
                          {wallet.name}{' '}
                          <span className="uppercase">({wallet.symbol})</span>
                        </p>
                        <p className="typography-xs font-light capitalize text-bitrush-neutral-200">
                          {wallet.blockchain} Network
                        </p>
                      </div>
                      <RenderIf isTrue={isSelected}>
                        <FaCheck className="typography-xs text-bitrush-blue-600" />
                      </RenderIf>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WalletSelector
