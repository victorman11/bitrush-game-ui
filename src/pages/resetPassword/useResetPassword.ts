import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { QueryKeys } from '@/commons/consts'
import { MutationErrorProps } from '@/commons/types/errors'
import { handleMutationErros } from '@/services/mutation'

import {
  ResetPasswordData,
  resetPasswordSchema,
} from './components/Form/schema'
import { doResetPassword, validateHash } from './store/actions'
import { ApiRequest } from './types'

const useResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token') || ''

  const { isError } = useQuery({
    queryFn: () => validateHash(token),
    queryKey: [QueryKeys.GET_VALIDATE_PASSWORD_HASH, token],
    enabled: !!token,
    retry: false,
  })

  const resetPasswordForm = useForm<ResetPasswordData>({
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ApiRequest.PasswordResetRequestType) => {
      const response = await doResetPassword(payload, token)
      return response
    },
    onSuccess: () => {
      toast.success('Password changed')
      navigate('/login')
    },
    onError: (error: MutationErrorProps) => {
      console.log({ error })
      toast.error('Expired link')
      const result = handleMutationErros(error)
      result?.forEach(({ key, value }) => {
        resetPasswordForm.setError(key as keyof ResetPasswordData, {
          message: value,
        })
      })
    },
  })

  function resetPassword(data: ResetPasswordData) {
    mutate(data)
  }

  const passwordWatch = useWatch({
    name: 'password',
    control: resetPasswordForm.control,
  })

  console.log(resetPasswordForm.formState.errors)

  return {
    form: { resetPasswordForm, resetPassword },
    functions: {},
    states: {
      isValid: resetPasswordForm.formState.isValid,
      isPending,
      isError: isError || !token,
      passwordWatch,
    },
    refs: {},
    translations: {},
  }
}

export default useResetPassword
