import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { convertRushToBtc } from '@/helpers/converter'

import { postDeposit } from '../../store/actions'
import {
  DepositRequestType,
  DepositResponseType,
} from '../../types/apiResponse'
import { DepositData, depositSchema } from './schema'

const useDeposit = () => {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const depositHookForm = useForm<DepositData>({
    resolver: zodResolver(depositSchema),
  })

  const rushValue = useWatch({
    control: depositHookForm.control,
    name: 'rush',
  })

  const totalInBtc = useMemo(() => {
    const value = convertRushToBtc(rushValue)

    return `${value} BTC`
  }, [rushValue])

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: DepositRequestType) => {
      const response = await postDeposit(payload)
      return response
    },
    onSuccess: (response: DepositResponseType) => {
      window.open(response.data.url, '_blank')?.focus()
      depositHookForm.reset()
      queryClient.refetchQueries({
        queryKey: [QueryKeys.GET_DEPOSIT],
      })
    },
  })

  const onSubmit = useCallback(
    (data: DepositData) => {
      mutate({
        bits: Number(data.rush),
        btc: Number(convertRushToBtc(data.rush)),
      })
    },
    [mutate],
  )

  return {
    form: { depositHookForm, onSubmit },
    functions: {},
    states: {
      user,
      totalInBtc,
      isPending,
    },
    refs: {},
    translations: {},
  }
}

export default useDeposit
