import { FormProvider } from 'react-hook-form'

import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import DataDisplay from '@/components/DataDisplay/DataDisplay'
import DataDisplayRow from '@/components/DataDisplay/DataDisplayRow.tsx'
import { Form } from '@/components/Form'
import LastWithdrawalsTable from '@/components/ListWithdrawalsTable/LastWithdrawalsTable.tsx'

import useWithdrawal from './useWithdrawal.ts'

const Withdrawal = () => {
  const {
    form,
    states,
    functions: {
      setMinWithdrawValue,
      setMaxWithdrawValue,
      setHalfWithdrawValue,
    },
  } = useWithdrawal()
  return (
    <>
      <Card>
        <div className="p-6">
          <p className="typography-h1 mb-6 text-bitrush-neutral-0">
            Withdrawal
          </p>
          <p className="typography-xs mb-6 text-bitrush-neutral-200">
            Current balance:{' '}
            <span className="typography-xs text-bitrush-neutral-0">
              {states.user?.bits} RUSH
            </span>
          </p>

          <FormProvider {...form.withdrawalForm}>
            <form
              onSubmit={form.withdrawalForm.handleSubmit(form.onSubmit)}
              className="flex w-full flex-col gap-6"
            >
              <Form.Container>
                <Form.Field>
                  <Form.Label htmlFor="address">BTC Address</Form.Label>
                  <Form.Input
                    name="address"
                    placeholder="Enter your BTC address"
                  />
                </Form.Field>
                <Form.ErrorMessage field="address" />
              </Form.Container>
              <Form.Container>
                <Form.Field>
                  <Form.Label htmlFor="rush">Amount</Form.Label>
                  <Form.Input name="rush" placeholder="Enter the amount" />
                </Form.Field>
                <Form.ErrorMessage field="rush" />
              </Form.Container>
              <div className="-mt-4 mb-1 flex flex-row justify-between gap-2">
                <Button label="Min" onClick={setMinWithdrawValue} />
                <Button label="Half" onClick={setHalfWithdrawValue} />
                <Button label="Max" onClick={setMaxWithdrawValue} />
              </div>
              <DataDisplay>
                <DataDisplayRow
                  title="Available balance"
                  value={states.user?.bits}
                  valueUnit=" RUSH"
                />
                <DataDisplayRow
                  title="Amount to withdraw"
                  value={states.amountToWithdraw}
                  valueUnit=" RUSH"
                />
                <DataDisplayRow
                  title="BTC equivalence"
                  value={states.equivalentInBtc}
                  fracDigits={8}
                  valueUnit=" BTC"
                />
                <DataDisplayRow
                  title="Fee"
                  value={states.fee}
                  valueUnit=" RUSH"
                />
                <DataDisplayRow
                  title="Total"
                  value={states.total}
                  valueUnit=" RUSH"
                />
              </DataDisplay>
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
                <Form.ErrorMessage field="amount" />
              </Form.Container>
              <Form.ErrorMessage field="root" />
              <Button
                label={`Withdraw${
                  states.total ? ' ' + states.total + ' RUSH' : ''
                }`}
                variant="play"
                onClick={form.withdrawalForm.handleSubmit(form.onSubmit)}
                loading={states.isPending}
              />
            </form>
          </FormProvider>
        </div>
      </Card>
      <div className="py-2" />
      <LastWithdrawalsTable />
    </>
  )
}

export default Withdrawal
