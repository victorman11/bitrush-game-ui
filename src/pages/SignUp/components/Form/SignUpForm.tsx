import { FormProvider } from 'react-hook-form'

import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'
import Dropdown from '@/components/Form/Dropdown/Dropdown'
import PasswordValidator from '@/components/PasswordValidator/PasswordValidator'

import { TermsAndConditions } from '../TermsAndConditions'
import useSignUpForm from './useSignUpForm'

export function SignUpForm() {
  const { form, functions, states } = useSignUpForm()
  const { handleSubmit } = form.signUpForm

  return (
    <div className="w-full lg:w-2/3 xl:w-[34.22vw]">
      <Card.Container className="p-6">
        <Card.Title className="mb-10 lg:mb-6">Create an account</Card.Title>
        <Card.Content>
          <FormProvider {...form.signUpForm}>
            <form
              onSubmit={handleSubmit(form.signUp)}
              className="flex w-full flex-col gap-4 lg:gap-6"
            >
              <Form.Container>
                <Form.Field>
                  <Form.Label htmlFor="userName">Username</Form.Label>
                  <Form.Input
                    type="userName"
                    name="userName"
                    placeholder="Enter your user name"
                    onChange={functions.handleChangeUserName}
                  />
                </Form.Field>
                <Form.ErrorMessage field="userName" />
              </Form.Container>
              <Form.Container>
                <Form.Field>
                  <Form.Label htmlFor="birth">Birthdate</Form.Label>
                  <Form.DateInput name="birth" />
                </Form.Field>
                <Form.ErrorMessage field="birth" />
              </Form.Container>

              <Form.Container>
                <Form.Field>
                  <Form.Label htmlFor="country">Country</Form.Label>
                  <Dropdown
                    name="country"
                    options={states.countries}
                    onOptionSelected={() => null}
                    hasSearch={true}
                    hasIcon={true}
                    placeholder="Select your country"
                    defaultOption={form.data.country}
                  />
                </Form.Field>
                <Form.ErrorMessage field="country" />
              </Form.Container>

              <Form.Container>
                <Form.Field>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                  />
                </Form.Field>
                <Form.ErrorMessage field="email" />
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
                <div className="flex flex-col">
                  <Form.ErrorMessage field="password" />
                  <PasswordValidator password={states.password} />
                </div>
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
                <div className="flex flex-col">
                  <Form.ErrorMessage field="confirmPassword" />
                </div>
              </Form.Container>

              <Form.Container>
                <Form.Field>
                  <Form.Checkbox name="termsAndConditions">
                    <TermsAndConditions />
                  </Form.Checkbox>
                </Form.Field>
              </Form.Container>

              <Button
                disabled={!states.isValid}
                loading={states.isPending}
                variant="play"
                label="Create an account"
                size="large"
                onClick={handleSubmit(form.signUp)}
              />
            </form>
          </FormProvider>
          <div className="flex flex-col justify-items-center gap-2 pt-8 text-center">
            <span className="typography-xs font-thin text-bitrush-neutral-0">
              Already have an account?
            </span>
            <a
              className="typography-sm cursor-pointer text-bitrush-blue-500 hover:underline"
              onClick={functions.handleSignIn}
            >
              Login
            </a>
          </div>
        </Card.Content>
      </Card.Container>
    </div>
  )
}
