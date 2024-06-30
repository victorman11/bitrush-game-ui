import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'

import { EmailVerificationCountDown } from '../EmailVerificationCountDown'
import { useEmailVerification } from './useEmailVerification'

export function EmailVerification() {
  const { form, functions, states } = useEmailVerification()

  return (
    <div className="w-full lg:w-2/3 xl:w-[34.22vw]">
      <Card.Container className="p-6">
        <Card.Header className="flex-col items-start">
          <Card.Title className="mb-2">An email has been sent to</Card.Title>
          <div className="flex gap-2">
            <span className="typography-xs text-bitrush-yellow-600">
              {states.email}
            </span>
            <button
              className="typography-xs text-bitrush-blue-500"
              onClick={functions.previousStep}
            >
              (change e-mail)
            </button>
          </div>
        </Card.Header>
        <Card.Content>
          <FormProvider {...form.emailValidationForm}>
            <form
              onSubmit={form.validateCodeAndSignUp}
              className="flex w-full flex-col"
            >
              <Form.Container>
                <Form.Field>
                  <Form.Label htmlFor="emailCode">Email code</Form.Label>
                  <Form.Input
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    name="emailCode"
                    placeholder="Enter the received code"
                    maxLength={6}
                    onChange={functions.handleCodeChange}
                  />
                </Form.Field>
                <Form.ErrorMessage field="emailCode" />
                {states.invalidCodeError && (
                  <span className="typography-xs mt-1 font-thin text-bitrush-red-500">
                    invalid code
                  </span>
                )}
              </Form.Container>
              <div className="mb-10 mt-2">
                <EmailVerificationCountDown
                  resendCode={functions.resendCode}
                  isResending={states.resendCodeIsPending}
                />
              </div>
              <Button
                disabled={!states.isDisabled}
                loading={states.isPending}
                variant="play"
                label="Validate"
                size="large"
                type="submit"
                onClick={form.validateCodeAndSignUp}
              />
            </form>
          </FormProvider>
          <div className="flex flex-col justify-items-center gap-2 pt-10 text-center">
            <p className="typography-xs font-thin text-bitrush-neutral-0">
              You already have an account?
            </p>
            <Link
              to="/login"
              className="typography-sm cursor-pointer text-bitrush-blue-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </Card.Content>
      </Card.Container>
    </div>
  )
}
