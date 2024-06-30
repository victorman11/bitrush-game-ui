import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { format, isValid, parse } from 'date-fns'
import { ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CookieKeys } from '@/commons/consts'
import { getAllCountries } from '@/helpers/coutries'
import { usernameRegex } from '@/helpers/regex'
import * as Cookies from '@/services/cookieStorage'

import { requestEmailCode } from '../../store/actions'
import {
  useStepFormData,
  useStepFormDataHandler,
  useStepHandler,
} from '../../store/useStepFormStore'
import { ApiRequest } from '../../types'
import { SignUpData, signUpSchema } from './schema'

const useSignUpForm = () => {
  const navigate = useNavigate()
  const { updateFormData } = useStepFormDataHandler()
  const { nextStep } = useStepHandler()
  const formData = useStepFormData() as SignUpData

  const hasAffiliate = Cookies.getValueFromCookie(
    CookieKeys.HAS_AFFILIATE_COOKIE,
  )

  useEffect(() => {
    if (!hasAffiliate) {
      navigate('/affiliate-code')
    }
  }, [navigate, hasAffiliate])

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      ...formData,
      birth: formData.birth ? format(formData.birth, 'dd/MM/yyyy') : '',
    },
  })

  const requestEmailCodeMutation = useMutation({
    mutationFn: async (payload: ApiRequest.CodeRequestType) => {
      const response = await requestEmailCode(payload)
      return response
    },
    onSuccess: () => {
      toast.success('A code has been sent to your email!')
    },
  })

  async function signUp(data: SignUpData) {
    try {
      const parsedDate = parse(data.birth, 'dd/MM/yyyy', new Date())
      if (!isValid(parsedDate)) {
        throw new Error('Error: Invalid birth date.')
      }

      data.birth = parsedDate.toISOString()

      if (data.country === 'none') {
        signUpForm.setError('country', { message: 'Country is required' })
      }

      const affiliateCode = Cookies.getValueFromCookie(
        CookieKeys.AFFILIATE_CODE_COOKIE,
      )

      if (affiliateCode) {
        const payload = {
          affiliateCode,
          ...data,
        } as ApiRequest.SignUpRequestType

        await requestEmailCodeMutation.mutateAsync({
          email: data.email,
          userName: data.userName,
        })
        updateFormData(payload)
        nextStep()
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data) {
          const data = error.response.data
          if (data?.email === 'exists') {
            signUpForm.setError('email', { message: 'E-mail already exists' })
          }
          if (data?.userName === 'exists') {
            signUpForm.setError('userName', {
              message: 'Username already exists',
            })
          }
        }
      }
    }
  }

  function handleChangeUserName(event: ChangeEvent<HTMLInputElement>) {
    const filteredValue = event.target.value.replace(usernameRegex, '')
    signUpForm.setValue('userName', filteredValue)
  }

  function handleSignIn() {
    navigate('/login')
  }

  return {
    form: { signUpForm, signUp, data: formData },
    functions: {
      handleSignIn,
      handleChangeUserName,
    },
    states: {
      isValid: signUpForm.formState.isValid,
      isPending: signUpForm.formState.isSubmitting,
      password: signUpForm.watch('password'),
      countries: getAllCountries(),
      birth: signUpForm.watch('birth'),
      hasAffiliate,
    },
    refs: {},
    translations: {},
  }
}

export default useSignUpForm
