import { FormProvider } from 'react-hook-form'

import envVariables from '@/commons/consts/envVariables'
import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'

import useDeposit from './useDeposit'
const appDomain = envVariables.APP_DOMAIN

type DepositFormProps = {
  headerRight?: JSX.Element
}

const DepositForm = ({ headerRight = undefined }: DepositFormProps) => {
  const { form, states } = useDeposit()

  return (
    <Card.Container className="thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll">
      <Card.Header headerRight={headerRight}>
        <Card.Title>Add RUSH to your account to play.</Card.Title>
      </Card.Header>
      <Card.Content>
        <FormProvider {...form.depositHookForm}>
          <form
            onSubmit={form.depositHookForm.handleSubmit(form.onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="rush">RUSH</Form.Label>
                <Form.Input name="rush" placeholder="Enter amount in RUSH" />
              </Form.Field>
              <Form.ErrorMessage field="rush" />
            </Form.Container>
          </form>
        </FormProvider>

        <p className="typography-xs my-2 text-bitrush-neutral-100">
          Equivalent to {states.totalInBtc}
        </p>
        <span className="typography-xs my-1 text-bitrush-neutral-100">
          * 1 BTC = 1,000,000 RUSH
        </span>
      </Card.Content>

      <Card.Footer className="flex flex-1 flex-col justify-end">
        <Button
          className="mb-6 mt-2"
          label="Deposit"
          onClick={form.depositHookForm.handleSubmit(form.onSubmit)}
          loading={states.isPending}
        />
        <p className="typography-xs text-bitrush-blue-100">
          If your funds don’t appear in the next 2 hours, please contact us at:{' '}
          <a
            href={`mailto: support@${appDomain}`}
            className="typography-xs text-bitrush-blue-700"
          >
            {`support@${appDomain}`}
          </a>
        </p>
      </Card.Footer>
    </Card.Container>
  )
}

export default DepositForm
