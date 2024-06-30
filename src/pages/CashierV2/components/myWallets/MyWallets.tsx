import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import DataDisplay from '@/components/DataDisplay/DataDisplay'

import SeedTable from './components/SeedTable'
import useMyWallets from './useMyWallets'

const MyWallets = () => {
  const { states, functions } = useMyWallets()

  return (
    <Card.Container className="thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll p-6 lg:p-10">
      <Card.Header>
        <Card.Title className="w-full text-center">
          My Wallet <br />
          <span className="text-bitrush-yellow-600">Solana Blockchain</span>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-1 flex-row">
          <DataDisplay className="flex items-center justify-center">
            <span className="text-regular bitrush-neutral-100 typography-xs">
              Your Public Address
            </span>
          </DataDisplay>
          <DataDisplay className="flex flex-1 items-center justify-center overflow-hidden">
            <p className="text-regular bitrush-neutral-100 typography-xs truncate">
              {states.wallet}
            </p>
          </DataDisplay>
        </div>
        <Button
          className="mb-6 mt-2"
          label="See my Wallet on Blockchain"
          onClick={functions.openOnBlockchain}
        />

        <DataDisplay>
          <p className="typography-sm mb-2 font-bold text-bitrush-neutral-0">
            At Crashouse your keys your money
          </p>
          <p className="font-base typography-xs mb-1 text-bitrush-neutral-200">
            Go to Deposit to credit your balance and start playing
          </p>
          <p className="typography-xs font-light text-bitrush-yellow-500">
            Your seed is personal and must remain secret.
          </p>
        </DataDisplay>

        <SeedTable
          seed={states.seeds}
          tableColumns={states.tableColumns}
          visible={states.isSeedVisible}
        />
      </Card.Content>

      <Card.Footer className="flex flex-1 flex-col justify-end">
        <Button
          className="mt-6"
          size="large"
          variant="play"
          label={
            states.disabled
              ? `Seed will be hidden in ${states.timeLeft}`
              : 'Reveal my seed'
          }
          disabled={states.disabled}
          onClick={() => functions.toggleVisibility()}
        />
      </Card.Footer>
    </Card.Container>
  )
}

export default MyWallets
