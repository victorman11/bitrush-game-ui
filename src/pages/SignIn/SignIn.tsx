import { FormProvider } from 'react-hook-form'

import { LayoutUnauthorized } from '@/components'
import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'

import useSignIn from './useSignIn'

function SignIn() {
  const { form, functions, states } = useSignIn()
  const { handleSubmit } = form.signInForm
  return (
    <LayoutUnauthorized>
      <div className=" w-full lg:mt-0 lg:flex lg:w-2/3 lg:items-center lg:justify-center xl:w-[34.22vw]">
        <Card.Container className="p-6">
          <Card.Title className="mb-10 lg:mb-6">Login</Card.Title>
          <Card.Content>
            <FormProvider {...form.signInForm}>
              <form
                onSubmit={handleSubmit(form.signIn)}
                className="flex w-full flex-col gap-4 lg:gap-6"
              >
                <Form.Container>
                  <Form.Field>
                    <Form.Label htmlFor="userName">Username</Form.Label>
                    <Form.Input
                      type="userName"
                      name="userName"
                      placeholder="Enter your Username"
                    />
                  </Form.Field>
                  <Form.ErrorMessage field="userName" />
                </Form.Container>
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
                </Form.Container>
                <a
                  className="typography-sm cursor-pointer text-right text-bitrush-blue-500 hover:underline"
                  onClick={functions.handleResetPassword}
                >
                  Reset password
                </a>
                <Button
                  disabled={!states.isValid}
                  variant="play"
                  label="Login"
                  size="large"
                  onClick={handleSubmit(form.signIn)}
                  loading={states.isPending}
                />
              </form>
            </FormProvider>
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
          </Card.Content>
        </Card.Container>
      </div>
    </LayoutUnauthorized>
  )
}

export default SignIn
