import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { QueryKeys } from '@/commons/consts'
import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { Form } from '@/components/Form'
import { queryClient } from '@/components/Providers/Providers'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import { EmailSchema, emailSchema } from '../schemas/emailSchema'
import * as Actions from '../store/actions'
import * as ApiRequest from '../types/apiRequest'

const EmailModalContent = () => {
  const navigate = useNavigate()
  const { isDesktop } = useDeviceWidth()

  const editEmailForm = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { handleSubmit } = editEmailForm

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ApiRequest.UpdateEmailRequestType) => {
      const response = await Actions.patchEditEmail(payload)
      return response
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.GET_ME] })
      toast.success('Your email has been changed')
      editEmailForm.reset({
        password: '',
        email: '',
        newEmail: '',
      })
    },
    onError: () => {
      toast.error('Error on change email')
    },
  })

  const editEmail = (data: EmailSchema) => {
    mutate(data)
  }

  const handleRecoverPassword = () => navigate('/forgot-password')

  return (
    <div className="md:max-w-1xl mx-auto flex max-w-xl flex-col gap-5 px-5 text-bitrush-neutral-100">
      {isDesktop ? <Card.Title>Edit email address</Card.Title> : null}
      <Card.Container className="p-6">
        <FormProvider {...editEmailForm}>
          <div className={`flex flex-col ${isDesktop ? 'gap-7' : 'gap-10'}`}>
            <span className="typography-xs font-thin text-bitrush-neutral-0">
              Your email address is used to secure your account and reset your
              password in case you forget it.
            </span>

            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="email">Current email</Form.Label>
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </Form.Field>
              <Form.ErrorMessage field="email" />
            </Form.Container>

            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="newEmail">New email</Form.Label>
                <Form.Input
                  type="email"
                  name="newEmail"
                  placeholder="Enter your new email"
                />
              </Form.Field>
              <Form.ErrorMessage field="newEmail" />
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
              onClick={handleRecoverPassword}
            >
              Forgot password?
            </a>
            <Button
              disabled={!editEmailForm.formState.isValid}
              variant="play"
              label="Edit email address"
              size="large"
              onClick={handleSubmit(editEmail)}
              loading={isPending}
            />
          </div>
        </FormProvider>
      </Card.Container>
    </div>
  )
}

export { EmailModalContent }
