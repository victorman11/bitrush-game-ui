import { FormProvider } from 'react-hook-form'

import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import Divisor from '@/components/Divisor/Divisor'
import { Form } from '@/components/Form'

import useMainWithdrawal from './useMainWithdrawal'

const MainWithdrawalCard = () => {
  const {
    form,
    states,
    functions: {
      handlePasteAddress,
      setMinWithdrawValue,
      setMaxWithdrawValue,
      setHalfWithdrawValue,
      getUserBalance,
      handleAmountChange,
    },
  } = useMainWithdrawal()
  return (
    <FormProvider {...form.withdrawalForm}>
      <form onSubmit={form.withdrawalForm.handleSubmit(form.onSubmit)}>
        <Card.Container className="thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll p-6 lg:p-10">
          <Card.Header>
            <Card.Title className="w-full text-center">
              Withdraw{' '}
              <span className="text-bitrush-yellow-600">USDC on Solana</span>{' '}
              <br />
              from your wallet
            </Card.Title>
          </Card.Header>

          <div className="my-4 text-center">
            <span className="typography-xs leading-normal text-bitrush-neutral-200">
              Part of your balance may not be withdrawable if you have
              unconfirmed precredited deposits or are participating in the
              current game.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="main_address">
                  USDC Withdraw Address
                </Form.Label>
                <Form.Input
                  name="main_address"
                  placeholder="Enter the address"
                />
              </Form.Field>
              <Form.ErrorMessage field="main_address" />
            </Form.Container>
            <Button
              label="Paste Address"
              variant="primary"
              onClick={handlePasteAddress}
            />
          </div>

          <div className="flex flex-col gap-1 py-5">
            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="main_amount">
                  Amount to Withdraw
                </Form.Label>
                <Form.Input
                  onChange={handleAmountChange}
                  name="main_amount"
                  placeholder="Enter the amount"
                />
              </Form.Field>
              <Form.ErrorMessage field="main_amount" />
            </Form.Container>
            <div className="flex flex-row justify-between gap-2">
              <Button label="Min" onClick={setMinWithdrawValue} />
              <Button label="Half" onClick={setHalfWithdrawValue} />
              <Button label="Max" onClick={setMaxWithdrawValue} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span className="typography-xs font-light text-bitrush-neutral-0">
                Available balance
              </span>
              <span className="typography-xs">{getUserBalance()} USDC</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="typography-xs font-light text-bitrush-neutral-0">
                Amount to withdraw
              </span>
              <span className="typography-xs">{states.amountToWithdraw}</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="typography-xs font-light text-bitrush-neutral-0">
                Gas
              </span>
              <span className="typography-xs">{states.gas}</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="typography-xs font-light text-bitrush-neutral-0">
                Total
              </span>
              <span className="typography-xs text-bitrush-green-500">
                {states.total}
              </span>
            </div>
          </div>

          <div className="!mb-6 !mt-4">
            <Divisor />
          </div>

          <div className="flex flex-col gap-6">
            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="main_password">Password</Form.Label>
                <Form.Input
                  type="password"
                  name="main_password"
                  min={0}
                  placeholder="Enter your password"
                  showPassword
                />
              </Form.Field>
              <Form.ErrorMessage field="main_password" />
            </Form.Container>

            <Button
              disabled={states.disabledButton}
              label={`Withdraw${
                states.total ? ' ' + states.total + ' USDC' : ''
              }`}
              variant="play"
              onClick={form.withdrawalForm.handleSubmit(form.onSubmit)}
              loading={states.isPending}
            />
          </div>

          <div className="py-6 leading-normal">
            <span className="typography-xs text-justify leading-normal text-bitrush-neutral-0">
              Your withdrawal will be sent from the hot wallet, do not withdraw
              to any site that uses the sending address, or returns to sender,
              because any returns will probably be credited to a different
              player. If you have any problem, please contact support:{' '}
              <span className="text-bitrush-blue-500">support@bitrush.com</span>
            </span>
          </div>
        </Card.Container>
      </form>
    </FormProvider>
  )
}

export default MainWithdrawalCard
