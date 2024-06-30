import { FormProvider } from 'react-hook-form'

import { LayoutUnauthorized } from '@/components'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import { Form } from '@/components/Form'
import PasswordValidator from '@/components/PasswordValidator/PasswordValidator'
import RenderIf from '@/components/RenderIf/RenderIf'

import useResetPassword from './useResetPassword'

function ResetPassword() {
  const { form, states } = useResetPassword()
  const { handleSubmit } = form.resetPasswordForm
  return (
    <LayoutUnauthorized>
      <div className="w-[530px]">
        <Card>
          <div className=" p-6">
            <RenderIf isTrue={states.isError}>
              <a className="typography-h1 text-bitrush-neutral-0 ">
                Invalid link
              </a>
            </RenderIf>
            <RenderIf isTrue={!states.isError}>
              <FormProvider {...form.resetPasswordForm}>
                <form
                  onSubmit={handleSubmit(form.resetPassword)}
                  className="flex w-full flex-col gap-6"
                >
                  <a className="typography-h1 text-bitrush-neutral-0 ">
                    Reset password
                  </a>
                  <Form.Container>
                    <Form.Field>
                      <Form.Label htmlFor="password">Password</Form.Label>
                      <Form.Input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        showPassword
                      />
                    </Form.Field>
                    <Form.ErrorMessage field="password" />
                    <PasswordValidator password={states.passwordWatch} />
                  </Form.Container>
                  <Form.Container>
                    <Form.Field>
                      <Form.Label htmlFor="confirmPassword">Confirm</Form.Label>
                      <Form.Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        showPassword
                      />
                    </Form.Field>
                    <Form.ErrorMessage field="confirmPassword" />
                  </Form.Container>

                  <Button
                    disabled={!states.isValid}
                    variant="play"
                    label="Reset Password"
                    size="large"
                    onClick={handleSubmit(form.resetPassword)}
                    loading={states.isPending}
                  />
                </form>
              </FormProvider>
            </RenderIf>
          </div>
        </Card>
      </div>
    </LayoutUnauthorized>
  )
}

export default ResetPassword
