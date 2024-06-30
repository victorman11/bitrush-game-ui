import { FaRegHand } from 'react-icons/fa6'
import { QR } from 'react-qr-rounded'

import envVariables from '@/commons/consts/envVariables'
import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import DataDisplay from '@/components/DataDisplay/DataDisplay'
import { copyStringToClipboard } from '@/helpers/clipboard'

type MainDepositCardProps = {
  wallet: string | undefined
}

const MainDepositCard = ({ wallet = '-' }: MainDepositCardProps) => {
  const handleCopyWalletAddress = (hash: string) => {
    copyStringToClipboard(hash, 'Wallet address has been copied!')
  }

  return (
    <Card.Container className="thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll p-6 lg:p-10">
      <Card.Header>
        <Card.Title className="w-full text-center">
          Deposit{' '}
          <span className="text-bitrush-yellow-600">USDC on Solana</span> <br />
          in your wallet
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-1 flex-row">
          <DataDisplay className="flex items-center justify-center ">
            <span className="text-regular bitrush-neutral-100 typography-xs ">
              USDC Deposit Address
            </span>
          </DataDisplay>
          <DataDisplay className="flex flex-1 items-center justify-center overflow-hidden">
            <span className="text-regular bitrush-neutral-100 typography-xs truncate lowercase">
              {wallet}
            </span>
          </DataDisplay>
        </div>
        <div className="my-3 flex flex-row items-center justify-center">
          <FaRegHand className="typography-xs mr-1 text-bitrush-neutral-300" />
          <span className="typography-xs text-center font-light text-bitrush-neutral-300">
            Only deposit USDC on Solana on this address
          </span>
        </div>

        <Button
          className="mb-6 mt-2"
          label="Copy Address"
          onClick={() => handleCopyWalletAddress(wallet)}
        />

        <div className="my-6 bg-bitrush-neutral-800 py-4">
          <div className="mx-auto w-36 rounded-xl border border-bitrush-blue-700 p-2">
            <QR
              backgroundColor="#14151D"
              color="#FFF"
              width={128}
              height={128}
              rounding={75}
            >
              {wallet}
            </QR>
          </div>
        </div>
      </Card.Content>

      <Card.Footer className="flex flex-1 flex-col justify-end">
        <p className="typography-xs text-center text-bitrush-blue-100">
          No minimum deposit
        </p>
        <p className="typography-xs text-center leading-normal text-bitrush-blue-100">
          If funds aren&apos;t received within 2 hours, contact{' '}
          <a
            href={`mailto: support@${envVariables.APP_DOMAIN}`}
            className="typography-xs text-bitrush-blue-700"
          >
            {`support@${envVariables.APP_DOMAIN}`}
          </a>
        </p>
      </Card.Footer>
    </Card.Container>
  )
}

export default MainDepositCard
