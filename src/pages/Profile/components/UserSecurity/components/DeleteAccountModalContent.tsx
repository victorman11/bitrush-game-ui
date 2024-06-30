import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuthStore } from '@/commons/stores'
import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'
import useAuth from '@/hooks/useAuth'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import {
  deleteAccountSchema,
  DeleteSchema,
} from '../schemas/deleteAccountSchema'
import * as Actions from '../store/actions'
import * as ApiRequest from '../types/apiRequest'

const DeleteAccountModalContent = () => {
  const { doLogOut } = useAuth()
  const { user } = useAuthStore()
  const { isDesktop } = useDeviceWidth()
  const navigate = useNavigate()

  const deleteAccountForm = useForm<DeleteSchema>({
    resolver: zodResolver(deleteAccountSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { handleSubmit } = deleteAccountForm

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ApiRequest.DeleteAccountRequestType) => {
      const response = await Actions.postDeleteAccount({
        password: payload.password,
      })

      return response
    },
    onSuccess: () => {
      doLogOut()
    },
    onError: () => {
      toast.error('Error on delete account')
    },
  })

  const deleteAccount = (data: DeleteSchema) => {
    mutate(data)
  }

  const handleRecoverPassword = () => navigate('/forgot-password')

  return (
    <div className="md:max-w-1xl mx-auto flex max-w-xl flex-col gap-5 px-5 text-bitrush-neutral-100">
      {isDesktop ? <Card.Title>Delete account</Card.Title> : null}
      <Card.Container className="border-bitrush-blue-700 p-6">
        <FormProvider {...deleteAccountForm}>
          <div className={`flex flex-col ${isDesktop ? 'gap-7' : 'gap-10'}`}>
            <span className="typography-xs font-thin text-bitrush-neutral-0">
              <span>
                Deleting your account is permanent and cannot be undone.Your
                account will not be restored in any case.
              </span>
              <br />
              <br />
              <span>
                By permanently deleting your account you forfeit any remaining
                balance, pending tip and/or withdrawal, and investment you may
                have.
              </span>
            </span>

            <div
              className="rounded border border-solid border-bitrush-blue-700 px-3 py-2 "
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <span className="typography-xs font-thin text-bitrush-neutral-0">
                Account balance
              </span>
              <span className="typography-xs font-bold text-bitrush-neutral-0">
                {user?.bits} RUSH
              </span>
            </div>

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
              onClick={handleRecoverPassword}
            >
              Forgot password?
            </a>
            <Button
              disabled={!deleteAccountForm.formState.isValid}
              label="Delete account"
              size="large"
              onClick={handleSubmit(deleteAccount)}
              loading={isPending}
            />
          </div>
        </FormProvider>
      </Card.Container>
    </div>
  )
}

export { DeleteAccountModalContent }
