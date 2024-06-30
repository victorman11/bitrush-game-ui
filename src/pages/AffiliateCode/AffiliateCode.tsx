import { FormProvider } from 'react-hook-form'

import { LayoutUnauthorized } from '@/components'
import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'

import { useAffilateCode } from './useAffilateCode'

const AffiliateCode = () => {
  const { forms, functions, states } = useAffilateCode()
  const { handleSubmit } = forms.affiliateForm
  return (
    <LayoutUnauthorized>
      <div className="w-full lg:w-2/3 xl:w-[34.22vw]">
        <Card.Container>
          <Card.Title className="font-bold">
            Enter the affiliate code
          </Card.Title>
          <Card.Content className="flex flex-col gap-10 lg:gap-[3.90vh]">
            <div>
              <span className="typography-xs font-light">
                You need to be sponsored to access Crashouse.
                <br />
                Get one from a user you know.
              </span>
              <br />
              <span className="typography-xs font-light" />
            </div>
            <FormProvider {...forms.affiliateForm}>
              <Form.Container>
                <Form.Field>
                  <Form.Label htmlFor="affiliateCode">
                    Affiliate code
                  </Form.Label>
                  <Form.Input
                    type="text"
                    name="affiliateCode"
                    placeholder="Enter 8 characters code"
                  />
                </Form.Field>
                <Form.ErrorMessage field="affiliateCode" />
              </Form.Container>
            </FormProvider>
            <Button
              disabled={!states.isValid}
              variant="play"
              label="Validate"
              size="large"
              onClick={handleSubmit(functions.validateAffiliateCode)}
              loading={states.isLoading}
            />
            <div className="flex flex-col justify-items-center gap-2 text-center">
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
    </LayoutUnauthorized>
  )
}

export default AffiliateCode
