import { FormProvider } from 'react-hook-form'

import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import Divisor from '@/components/Divisor/Divisor'
import { Form } from '@/components/Form'
import WalletSelector from '@/components/WalletSelector/WalletSelector'

import useWithdrawal from './useWithdrawal'

const OtherWalletsDepositCard = () => {
  const {
    form,
    states,
    functions: {
      handlePasteAddress,
      setMinWithdrawValue,
      setMaxWithdrawValue,
      setHalfWithdrawValue,
      handleWithdrawNetworkChange,
      getExchangeFee,
      getCurrency,
      getUserBalance,
      handleAmountChange,
    },
  } = useWithdrawal()
  return (
    <FormProvider {...form.withdrawalForm}>
      <form onSubmit={form.withdrawalForm.handleSubmit(form.onSubmit)}>
        <Card.Container className="thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll p-6 lg:p-10">
          <Card.Header>
            <Card.Title className="w-full text-center">
              <span>
                Withdraw
                <span className="text-bitrush-yellow-600"> other Crypto </span>
                and we will debit from
                <br />
                your wallet in
                <span className="text-bitrush-yellow-600"> USDC Solana</span>
              </span>
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
            <WalletSelector
              label="Withdraw Network"
              placeholder="Choose a currency"
              onSelect={handleWithdrawNetworkChange}
            />
            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="address">Withdraw Address</Form.Label>
                <Form.Input name="address" placeholder="Enter the address" />
              </Form.Field>
              <Form.ErrorMessage field="address" />
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
                <Form.Label htmlFor="amount">Amount to Withdraw</Form.Label>
                <Form.Input
                  name="amount"
                  placeholder="Enter the amount"
                  onChange={handleAmountChange}
                />
              </Form.Field>
              <Form.ErrorMessage field="amount" />
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
              <span className="typography-xs">
                {getUserBalance()} {getCurrency()}
              </span>
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
              <span className="typography-xs"> {states.gas}</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="typography-xs font-light text-bitrush-neutral-0">
                Exchange Fee {getExchangeFee()}
              </span>
              <span className="typography-xs">{states.fee}</span>
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
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Input
                  type="password"
                  name="password"
                  min={0}
                  placeholder="Enter your password"
                  showPassword
                />
              </Form.Field>
              <Form.ErrorMessage field="password" />
            </Form.Container>

            <Button
              disabled={states.disabledButton}
              label={`Withdraw${
                states.total ? ' ' + states.total + ' ' + getCurrency() : ''
              }`}
              variant="play"
              onClick={form.withdrawalForm.handleSubmit(form.onSubmit)}
              loading={states.isPending}
            />
          </div>

          <div className="py-6">
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

export default OtherWalletsDepositCard
