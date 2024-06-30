import { FormProvider } from 'react-hook-form'

import { LayoutUnauthorized } from '@/components'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import { Form } from '@/components/Form'
import RenderIf from '@/components/RenderIf/RenderIf'

import useResetPassword from './useForgotPassword'

function ForgotPassword() {
  const { form, functions, states } = useResetPassword()
  const { handleSubmit } = form.resetPasswordForm
  return (
    <LayoutUnauthorized>
      <div className="w-[530px]">
        <Card>
          <div className=" p-6">
            <RenderIf isTrue={!states.emailSent}>
              <FormProvider {...form.resetPasswordForm}>
                <form
                  onSubmit={handleSubmit(form.handleResetPassword)}
                  className="flex w-full flex-col gap-6"
                >
                  <p className="typography-h1 text-bitrush-neutral-0 ">
                    Reset password
                  </p>

                  <Form.Container>
                    <Form.Field>
                      <Form.Label htmlFor="email">email</Form.Label>
                      <Form.Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                      />
                    </Form.Field>
                    <Form.ErrorMessage field="password" />
                  </Form.Container>

                  <Button
                    disabled={!states.isValid}
                    variant="play"
                    label="Send me a link"
                    size="large"
                    onClick={handleSubmit(form.handleResetPassword)}
                    loading={states.isPending}
                  />
                </form>
              </FormProvider>
              <RenderIf isTrue={!states.isLoggedIn}>
                <div className="flex flex-col justify-items-center gap-2 pt-8 text-center">
                  <span className="typography-xs font-thin text-bitrush-neutral-0">
                    You don’t have an account yet?
                  </span>
                  <a
                    className="typography-sm cursor-pointer text-bitrush-blue-500 hover:underline"
                    onClick={functions.handleSignUp}
                  >
                    Create an account
                  </a>
                </div>
              </RenderIf>
            </RenderIf>
            <RenderIf isTrue={states.emailSent}>
              <p className="typography-sm text-center text-bitrush-neutral-0">
                A link was sent to your e-mail.
              </p>
            </RenderIf>
          </div>
        </Card>
      </div>
    </LayoutUnauthorized>
  )
}

export default ForgotPassword
