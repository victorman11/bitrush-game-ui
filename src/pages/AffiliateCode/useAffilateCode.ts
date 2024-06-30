// @ts-nocheck
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { CookieKeys } from '@/commons/consts'
import { MutationErrorProps } from '@/commons/types/errors'
import {
  getValueFromCookie,
  removeValueFromCookie,
  setValueToCookie,
} from '@/services/cookieStorage'
import { handleMutationErros } from '@/services/mutation'

import { AffiliateData, affiliateSchema } from './schema'
import { postValidateAffiliateCode } from './store/actions'
import { AffiliateValidationRequestType } from './types/apiRequest'

const useAffilateCode = () => {
  const navigate = useNavigate()
  const affiliateCode = getValueFromCookie(CookieKeys.AFFILIATE_CODE_COOKIE)

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: AffiliateValidationRequestType) =>
      postValidateAffiliateCode(payload),
    onSuccess: () => {
      setValueToCookie(
        CookieKeys.AFFILIATE_CODE_COOKIE,
        affiliateForm.getValues('affiliateCode'),
      )
      setValueToCookie(CookieKeys.HAS_AFFILIATE_COOKIE, 'true')
      navigate('/signup')
    },
    onError: (error: MutationErrorProps) => {
      removeValueFromCookie(CookieKeys.HAS_AFFILIATE_COOKIE)

      if (error.response?.data?.affiliateCode === 'notFound') {
        affiliateForm.setError('affiliateCode' as keyof AffiliateData, {
          message: 'Unknown code',
        })
      }

      const result = handleMutationErros(error)

      result?.forEach(({ key, value }) => {
        affiliateForm.setError(key as keyof AffiliateData, {
          message: value,
        })
      })
    },
  })

  const affiliateForm = useForm<AffiliateData>({
    resolver: zodResolver(affiliateSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (affiliateCode) {
      affiliateForm.setValue('affiliateCode', affiliateCode)
    }
  }, [affiliateForm, affiliateCode])

  const validateAffiliateCode = (formData: AffiliateData) => {
    const { affiliateCode } = formData
    if (formData.affiliateCode) {
      mutate({ affiliateCode })
    }
  }

  const handleSignIn = () => {
    navigate('/login')
  }

  return {
    forms: { affiliateForm },
    functions: { handleSignIn, validateAffiliateCode },
    states: { isLoading: isPending, isValid: affiliateForm.formState.isValid },
  }
}

export { useAffilateCode }
