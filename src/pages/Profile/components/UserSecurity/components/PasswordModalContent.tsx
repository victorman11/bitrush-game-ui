import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuthStore } from '@/commons/stores'
import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'
import PasswordValidator from '@/components/PasswordValidator/PasswordValidator'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import { PasswordSchema, passwordSchema } from '../schemas/passwordSchema'
import * as Actions from '../store/actions'
import * as ApiRequest from '../types/apiRequest'

const PasswordModalContent = () => {
  const navigate = useNavigate()
  const { isDesktop } = useDeviceWidth()
  const { user } = useAuthStore()

  const editPasswordForm = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { handleSubmit } = editPasswordForm

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ApiRequest.UpdatePasswordRequestType) => {
      const response = await Actions.patchEditPassword({
        password: payload.password,
        newPassword: payload.newPassword,
      })

      return response
    },
    onSuccess: () => {
      toast.success('Your password has been changed')
      editPasswordForm.reset({
        password: '',
        confirmNewPassword: '',
        newPassword: '',
      })
    },
    onError: () => {
      toast.error('Error on change password')
    },
  })

  const editPassword = (data: PasswordSchema) => {
    mutate(data)
  }

  const handleRecoverPassword = () => navigate('/forgot-password')

  return (
    <div className="md:max-w-1xl mx-auto flex max-w-xl flex-col gap-5 px-5 text-bitrush-neutral-100">
      {isDesktop ? <Card.Title>Edit password</Card.Title> : null}
      <Card.Container className="p-6">
        <FormProvider {...editPasswordForm}>
          <div className={`flex flex-col ${isDesktop ? 'gap-7' : 'gap-9'}`}>
            <span className="typography-xs font-thin text-bitrush-neutral-0">
              <span>
                Your account&apos;s recovery email address is {user?.email}
              </span>
              <br />
              <br />
              <span>
                Your password can be reset using the current email address
                linked to your account.
              </span>
            </span>

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

            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="newPassword">New password</Form.Label>
                <Form.Input
                  type="password"
                  name="newPassword"
                  placeholder="Enter your new password"
                  showPassword
                />
              </Form.Field>
              <div className="mt-2 flex flex-col">
                <Form.ErrorMessage field="newPassword" />
                <PasswordValidator
                  password={editPasswordForm.watch('newPassword')}
                />
              </div>
            </Form.Container>

            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="confirmNewPassword">Confirm</Form.Label>
                <Form.Input
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm your new password"
                  showPassword
                />
              </Form.Field>
              <Form.ErrorMessage field="confirmNewPassword" />
            </Form.Container>

            <a
              className="typography-sm cursor-pointer text-right text-bitrush-blue-500 hover:underline"
              onClick={handleRecoverPassword}
            >
              Forgot password?
            </a>
            <Button
              disabled={!editPasswordForm.formState.isValid}
              variant="play"
              label="Edit password"
              size="large"
              onClick={handleSubmit(editPassword)}
              loading={isPending}
            />
          </div>
        </FormProvider>
      </Card.Container>
    </div>
  )
}

export { PasswordModalContent }
