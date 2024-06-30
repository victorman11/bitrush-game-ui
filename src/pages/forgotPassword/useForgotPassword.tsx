import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/commons/stores'
import { MutationErrorProps } from '@/commons/types/errors'
import { handleMutationErros } from '@/services/mutation'

import {
  ResetPasswordFirstStepData,
  resetPasswordFirstStepSchema,
} from './components/Form/schema'
import { requestPasswordResetEmail } from './store/actions'
import { ApiRequest } from './types'

const useResetPassword = () => {
  const { isLoggedIn } = useAuthStore()
  const [emailSent, setEmailSent] = useState(false)

  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ApiRequest.PasswordResetForm1) => {
      const response = await requestPasswordResetEmail(payload)

      return response
    },
    onSuccess: () => {
      setEmailSent(true)
    },
    onError: (error: MutationErrorProps) => {
      const result = handleMutationErros(error)
      result?.forEach(({ key, value }) => {
        if (key === 'user' && value === 'unauthorized') {
          resetPasswordForm.setError('email', {
            message: 'User does not exists.',
          })
        }
      })
    },
  })

  const resetPasswordForm = useForm<ResetPasswordFirstStepData>({
    resolver: zodResolver(resetPasswordFirstStepSchema),
  })

  function handleResetPassword(data: ResetPasswordFirstStepData) {
    mutate(data)
  }

  function handleSignUp() {
    navigate('/affiliate-code')
  }

  return {
    form: { resetPasswordForm, handleResetPassword },
    functions: {
      handleSignUp,
    },
    states: {
      isLoggedIn,
      isValid: resetPasswordForm.formState.isValid,
      isPending,
      emailSent,
    },
    refs: {},
    translations: {},
  }
}

export default useResetPassword
