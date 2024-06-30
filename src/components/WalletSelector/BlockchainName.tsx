import { Wallet } from '@/commons/types/auth'

type BlockchainNameProps = {
  wallet?: Wallet | null
}

const BlockchainName = ({ wallet }: BlockchainNameProps) => {
  if (!wallet?.name) {
    return null
  }

  const { blockchain } = wallet

  const blockchainName =
    blockchain.charAt(0).toUpperCase() + blockchain.slice(1)

  return (
    <p className="hidden pl-2 text-bitrush-neutral-200 lg:block">
      {blockchainName} Network
    </p>
  )
}

export { BlockchainName }
