import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import envVariables from '@/commons/consts/envVariables'
import { useAuthStore } from '@/commons/stores'
import { useWithdrawalStore } from '@/commons/stores/withdrawalStore.ts'
import { MutationErrorProps } from '@/commons/types/errors'
import { convertRushToBtc, getFee } from '@/helpers/converter'
import { handleMutationErros } from '@/services/mutation'

import { postWithdraw } from '../../store/actions'
import { WithdrawRequestType } from '../../types/apiResponse'
import { WithdrawData, withdrawSchema } from './schema'
const minWithdrawValueInRush = new BigNumber(
  envVariables.MIN_WITHDRAWAL_VALUE_IN_RUSH ?? 10,
)

const useWithdrawal = () => {
  const { user } = useAuthStore()
  const { refreshWithdrawals } = useWithdrawalStore()

  const withdrawalForm = useForm<WithdrawData>({
    resolver: zodResolver(withdrawSchema),
  })

  const rush = useWatch({
    control: withdrawalForm.control,
    name: 'rush',
  })

  const amountToWithdraw = useMemo(() => {
    return rush || 0
  }, [rush])

  const equivalentInBtc = useMemo(() => {
    return convertRushToBtc(rush)
  }, [rush])

  const fee = useMemo(() => {
    return getFee(rush)
  }, [rush])

  const total = useMemo(() => {
    if (!rush || !fee) {
      return new BigNumber(0).toString()
    }
    const result = new BigNumber(rush).minus(fee)
    return result.isNaN() ? '0' : result.toString()
  }, [rush, fee])

  useEffect(() => {
    const rushVal = new BigNumber(rush)
    const balance = new BigNumber(user?.bits ?? 0)

    if (rushVal.isGreaterThan(balance)) {
      console.log('shoudl error')
      withdrawalForm.setError('rush', {
        message: "You don't have enough balance",
      })
      return
    }

    if (withdrawalForm.formState.errors.rush) {
      withdrawalForm.clearErrors('rush')
    }
  }, [rush, user, withdrawalForm])

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: WithdrawRequestType) => {
      return await postWithdraw(payload)
    },
    onSuccess: () => {
      withdrawalForm.reset()
      refreshWithdrawals()
    },
    onError: (error: MutationErrorProps) => {
      refreshWithdrawals()
      const result = handleMutationErros(error)
      result?.forEach(({ key, value }) => {
        withdrawalForm.setError(key as keyof WithdrawData, {
          message: value,
        })
      })
    },
  })

  const onSubmit = useCallback(
    (data: WithdrawData) => {
      mutate({
        bits: Number(data.rush),
        address: data.address,
        password: data.password,
        feeInBits: Number(getFee(data.rush)),
      })
    },
    [mutate],
  )

  const setMinWithdrawValue = useCallback(() => {
    withdrawalForm.setValue('rush', minWithdrawValueInRush.toString())
  }, [withdrawalForm])

  const setHalfWithdrawValue = useCallback(() => {
    const value = new BigNumber(user?.bits ?? 0).dividedBy(2)

    withdrawalForm.setValue(
      'rush',
      (value.isLessThan(minWithdrawValueInRush)
        ? minWithdrawValueInRush
        : value
      ).toString(),
    )
  }, [withdrawalForm, user?.bits])

  const setMaxWithdrawValue = useCallback(() => {
    const maxVal = new BigNumber(user?.bits ?? 0)
    withdrawalForm.setValue('rush', maxVal.toString())
  }, [withdrawalForm, user?.bits])

  return {
    form: { withdrawalForm, onSubmit },
    functions: {
      setMinWithdrawValue,
      setMaxWithdrawValue,
      setHalfWithdrawValue,
    },
    states: {
      user,
      equivalentInBtc,
      amountToWithdraw,
      fee,
      total,
      isPending,
    },
    refs: {},
    translations: {},
  }
}

export default useWithdrawal
