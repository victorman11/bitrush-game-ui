import { QR } from 'react-qr-rounded'

import envVariables from '@/commons/consts/envVariables'
import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import DataDisplay from '@/components/DataDisplay/DataDisplay'
import Divisor from '@/components/Divisor/Divisor'
import WalletSelector from '@/components/WalletSelector/WalletSelector'
import { cut } from '@/helpers/stringHelpers'

import useOtherWalletDepositCard from './useOtherWalletDepositCard'

const appDomain = envVariables.APP_DOMAIN

const OtherWalletsDepositCard = () => {
  const { states, functions } = useOtherWalletDepositCard()

  return (
    <Card.Container className="thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll p-6 lg:p-10">
      <Card.Header>
        <Card.Title className="w-full text-center">
          Deposit <span className="text-bitrush-yellow-600">other crypto</span>{' '}
          and we will credit your wallet in{' '}
          <span className="text-bitrush-yellow-600">USDC Solana</span>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <WalletSelector
          label="Deposit Network"
          placeholder="Choose a currency"
          onSelect={(wallet) => functions.onSelect(wallet)}
        />
        <div className="mt-2 flex flex-1 flex-row">
          <DataDisplay
            className="flex items-center justify-center"
            variant={states.disabled ? 'disabled' : 'default'}
          >
            <span
              className={`text-regular typography-xs   ${
                states.selectedWallet?.name
                  ? ' text-bitrush-neutral-100'
                  : ' text-bitrush-neutral-300'
              } `}
            >
              Address for{' '}
              <span
                className={` capitalize ${
                  states.selectedWallet?.name
                    ? ' text-bitrush-yellow-500'
                    : ' text-bitrush-neutral-300'
                }`}
              >
                {states.selectedWallet?.name
                  ? states.selectedWallet?.name
                  : 'Currency'}
              </span>
            </span>
          </DataDisplay>
          <DataDisplay
            className="flex flex-1 items-center justify-center overflow-hidden"
            variant={states.disabled ? 'disabled' : 'default'}
          >
            <span className="text-regular bitrush-neutral-100 typography-xs truncate lowercase">
              {cut(states.address)}
            </span>
          </DataDisplay>
        </div>
        <Button
          className="mb-6 mt-2"
          label="Copy Address"
          disabled={states.disabled}
          onClick={() => functions.handleCopyWalletAddress(states.address)}
        />
      </Card.Content>

      <Card.Footer className="flex flex-1 flex-col justify-end">
        <Divisor className="mb-6" />
        <p className="typography-xs mb-3  text-bitrush-blue-100">
          Minimum Deposit:{' '}
          <span
            className={
              states.selectedWallet?.name
                ? ' text-bitrush-yellow-500'
                : ' text-bitrush-neutral-300'
            }
          >
            {states.minimumDeposit}
          </span>
        </p>
        <p className="typography-xs  text-bitrush-neutral-300">
          1,9% exchange fees will apply for your exchange into USDC Solana.
        </p>

        {!states.disabled && (
          <>
            <div className="my-6 bg-bitrush-neutral-800 py-4">
              <div className="mx-auto w-36 rounded-xl border border-bitrush-blue-700 p-2">
                <QR
                  backgroundColor="#14151D"
                  color="#FFF"
                  width={128}
                  height={128}
                  rounding={75}
                >
                  {states.address}
                </QR>
              </div>
            </div>
            <p className="typography-xs text-bitrush-blue-100">
              If your funds don’t appear in the next 2 hours, please contact us
              at:{' '}
              <a
                href={`mailto: support@${appDomain}`}
                className="typography-xs text-bitrush-blue-700"
              >
                {`support@${appDomain}`}
              </a>
            </p>
          </>
        )}
      </Card.Footer>
    </Card.Container>
  )
}

export default OtherWalletsDepositCard
