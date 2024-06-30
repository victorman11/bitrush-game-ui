import { FormProvider } from 'react-hook-form'

import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'
import InfoBox from '@/components/InfoBox/InfoBox'
import { cn } from '@/helpers/tailwindMerge'
import { withFirstDepositVerification } from '@/helpers/withFirstDepositVerification'
import DepositForm from '@/pages/Cashier/components/deposit/DepositForm'

import {
  ButtonBet,
  ButtonBetCancel,
  ButtonBetCashIn,
  ButtonBetNextRound,
  ButtonBetNextRoundCancel,
} from './components'
import useLiveBet from './useLiveBet'
const LiveBet = () => {
  const { functions, form, states } = useLiveBet()

  if (!states?.user?.hasDeposit && states.showFirstDeposit) {
    return (
      <DepositForm
        headerRight={
          <img
            className="cursor-pointer"
            src="close-icon.svg"
            alt="close"
            onClick={() => functions.setShowFirstDeposit(false)}
          />
        }
      />
    )
  }

  return (
    <Card.Container
      borderless={states.isMobile}
      className={cn(
        'thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll ',
      )}
    >
      <Card.Header>
        <Card.Title>Live Bet</Card.Title>
      </Card.Header>

      <Card.Content className="flex flex-1 ">
        <FormProvider {...form.liveBetForm}>
          <form className="flex w-full flex-col">
            <Form.Container>
              <div
                className={cn(
                  '2xl:mb-[3.90vh]',
                  states.isMobile ? 'mb-[1.5vh]' : 'mb-[1.5vh]',
                )}
              >
                <div className="mb-[1.5vh]">
                  <Form.Field>
                    <Form.Label htmlFor="bet" disabled={states.disableFields}>
                      Bet
                    </Form.Label>
                    <Form.Input
                      disabled={states.disableFields}
                      type="text"
                      name="bet"
                      placeholder="Place a bet"
                      inputMode="numeric"
                      step={1}
                      min={0}
                      onChange={functions.handleBetChange}
                    />
                  </Form.Field>
                  <Form.ErrorMessage field="bet" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <Button
                    disabled={states.disableFields}
                    label="Min"
                    onClick={() =>
                      functions.withFirstDepositVerification(
                        functions.handleFillBet,
                        'min',
                      )
                    }
                  />
                  <Button
                    disabled={states.disableFields}
                    label="Half"
                    onClick={() =>
                      functions.withFirstDepositVerification(
                        functions.handleFillBet,
                        'half',
                      )
                    }
                  />
                  <Button
                    disabled={states.disableFields}
                    label="Max"
                    onClick={() =>
                      functions.withFirstDepositVerification(
                        functions.handleFillBet,
                        'max',
                      )
                    }
                  />
                </div>
              </div>
            </Form.Container>

            <Form.Container>
              <div className="mb-[1.269vh] 2xl:mb-[1.56vh]">
                <Form.Field>
                  <Form.Label htmlFor="payout" disabled={states.disableFields}>
                    Payout
                  </Form.Label>
                  <Form.Input
                    disabled={states.disableFields}
                    type="text"
                    name="payout"
                    inputMode="decimal"
                    min={1.01}
                    placeholder="Enter your payout"
                    onChange={functions.handlePayoutChange}
                  />
                </Form.Field>
                <Form.ErrorMessage field="payout" />
              </div>
              <div className="mb-4 lg:mb-0">
                <Form.Slider disabled={states.disableFields} field="payout" />
              </div>
            </Form.Container>
          </form>
        </FormProvider>
      </Card.Content>

      <Card.Footer>
        <div
          className={cn(
            'lg:grid-10 mb-[1.269vh] grid grid-cols-1 lg:grid-cols-2 2xl:mb-[1.56vh]',
            states.isMobile ? 'gap-2' : 'gap-5',
          )}
        >
          <InfoBox
            title="Target amount"
            value={`${states.targetProfit} bits`}
          />
          <InfoBox title="Estimated win rate" value={`${states.winRate}%`} />
        </div>

        {/* BET BUTTONS */}
        <ButtonBet
          disabled={states.disableBetButton}
          onClick={() =>
            withFirstDepositVerification(functions.handleBetSubmit)
          }
        />
        <ButtonBetNextRound
          disabled={states.disableBetButton}
          onClick={() =>
            withFirstDepositVerification(functions.handleBetNextRoundSubmit)
          }
        />

        {/* CANCEL BUTTONS */}
        <ButtonBetCancel />
        <ButtonBetNextRoundCancel />

        {/* CASH-IN BUTTON */}
        <ButtonBetCashIn />
      </Card.Footer>
    </Card.Container>
  )
}

export default LiveBet
