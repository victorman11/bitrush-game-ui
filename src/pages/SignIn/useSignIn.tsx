import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ClientEvents } from '@/commons/consts/socketKeys.ts'
import { useAuthStore } from '@/commons/stores'
import { MutationErrorProps } from '@/commons/types/errors'
import * as Cookies from '@/services/cookieStorage'
import { handleMutationErros } from '@/services/mutation'
import { wsEmit } from '@/services/socket.ts'

import { SignInData, signInSchema } from './components/Form/schema'
import { doSignIn } from './store/actions'
import { ApiRequest, ApiResponse } from './types'

const useSignIn = () => {
  const logIn = useAuthStore((store) => store.logIn)
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ApiRequest.SignInRequestType) => {
      const response = await doSignIn(payload)
      return response
    },
    onSuccess: (response: ApiResponse.SignInResponseType) => {
      const { accessToken, refreshToken } = response.data
      Cookies.storeToken(accessToken, refreshToken)
      logIn()
      wsEmit(ClientEvents.LOGIN, accessToken)
      navigate('/')
    },
    onError: (error: MutationErrorProps) => {
      const result = handleMutationErros(error)
      result?.forEach(({ key, value }) => {
        if (key === 'user' && value === 'unauthorized') {
          signInForm.setError('userName', {
            message: 'Invalid username or password',
          })
        }
      })
    },
  })

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  })

  function signIn(data: SignInData) {
    mutate(data)
  }

  function handleSignUp() {
    navigate('/affiliate-code')
  }

  function handleResetPassword() {
    navigate('/forgot-password')
  }

  return {
    form: { signInForm, signIn },
    functions: {
      handleSignUp,
      handleResetPassword,
    },
    states: {
      isValid: signInForm.formState.isValid,
      isPending,
    },
    refs: {},
    translations: {},
  }
}

export default useSignIn
