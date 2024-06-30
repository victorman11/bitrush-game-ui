import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ClientEvents } from '@/commons/consts/socketKeys.ts'
import { useAuthStore } from '@/commons/stores'
import * as Cookies from '@/services/cookieStorage'
import { wsEmit } from '@/services/socket.ts'

import {
  doSignUp,
  requestEmailCode,
  validateEmailCode,
} from '../../store/actions'
import {
  useStepFormData,
  useStepFormDataHandler,
  useStepHandler,
} from '../../store/useStepFormStore'
import { ApiRequest, ApiResponse } from '../../types'
import { EmailCodeData, emailCodeSchema } from './schema'

export function useEmailVerification() {
  const { previousStep } = useStepHandler()
  const logIn = useAuthStore((store) => store.logIn)
  const { email } = useStepFormData() as { email: string }
  const { resetFormData } = useStepFormDataHandler()
  const navigate = useNavigate()
  const formData = useStepFormData() as ApiRequest.SignUpRequestType

  const emailValidationForm = useForm<EmailCodeData>({
    resolver: zodResolver(emailCodeSchema),
  })

  const signUpMutation = useMutation({
    mutationFn: async (payload: ApiRequest.SignUpRequestType) => {
      const response = await doSignUp(payload)
      return response
    },
    onSuccess: (response: ApiResponse.SignUpResponseType) => {
      const { accessToken, refreshToken } = response.data
      Cookies.storeToken(accessToken, refreshToken)

      logIn()
      wsEmit(ClientEvents.LOGIN, accessToken)
    },
  })

  const validateCodeMutation = useMutation({
    mutationFn: async (payload: ApiRequest.ValidateCodeRequestType) => {
      const response = await validateEmailCode(payload)
      return response
    },
    onSuccess: () => {
      toast.success('Your e-mail has been successfully verified!')
    },
  })

  const resendCodeMutation = useMutation({
    mutationFn: async (payload: ApiRequest.CodeRequestType) => {
      const response = await requestEmailCode(payload)
      return response
    },
    onSuccess: () => {
      toast.success('A new code has been sent to your email!')
    },
    onError: () => {
      toast.error('An error has occurred while sending the code!')
    },
  })

  async function validateCodeAndSignUp(data: EmailCodeData) {
    try {
      await validateCodeMutation.mutateAsync({
        email: formData.email,
        token: data.emailCode,
      })
      await signUpMutation.mutateAsync(formData)
      resetFormData()
      navigate('/')
    } catch (error) {
      if (!isAxiosError(error)) {
        toast.error('Error creating account')
      }
    }
  }

  async function resendCode() {
    resendCodeMutation.mutate({
      email: formData.email,
      userName: formData.userName,
    })
  }

  function handleCodeChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    const formattedValue = value.replace(/\D/, '')

    emailValidationForm.setValue('emailCode', formattedValue, {
      shouldValidate: true,
    })
  }

  return {
    form: {
      emailValidationForm,
      validateCodeAndSignUp: emailValidationForm.handleSubmit(
        validateCodeAndSignUp,
      ),
    },
    functions: {
      previousStep,
      resendCode,
      handleCodeChange,
    },
    states: {
      isDisabled: emailValidationForm.formState.isValid,
      isPending: emailValidationForm.formState.isSubmitting,
      email,
      invalidCodeError: validateCodeMutation.isError,
      resendCodeIsPending: resendCodeMutation.isPending,
    },
  }
}
