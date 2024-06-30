import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import BigNumber from 'bignumber.js'
import { ChangeEvent, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { MutationErrorProps } from '@/commons/types/errors'
import { queryClient } from '@/components/Providers/Providers.tsx'
import { copyStringFromClipboard } from '@/helpers/clipboard'
import { formatInputNumberWithSixDecimals } from '@/helpers/formatDecimals'
import { postWithdraw } from '@/pages/CashierV2/store/actions'
import { WithdrawRequestType } from '@/pages/CashierV2/types/apiResponse'

import { MainWithdrawData, mainWithdrawSchema } from '../../schema'
import { useWithdrawalSocketStore } from '../../store/useWithdrawalSocketStore'

const useMainWithdrawal = () => {
  const { user } = useAuthStore()
  const { data: withdrawSymbolData } = useWithdrawalSocketStore()
  const usdcCurrency = withdrawSymbolData.solana.usdc || null

  const withdrawalForm = useForm<MainWithdrawData>({
    resolver: zodResolver(mainWithdrawSchema),
    mode: 'onChange',
  })

  const amount = withdrawalForm.watch('main_amount')

  const amountToWithdraw = amount || 0

  const gas = useMemo(() => {
    const currentGas = usdcCurrency?.gas?.value

    return currentGas || 0
  }, [usdcCurrency?.gas])

  const total = useMemo(() => {
    if (!amount) {
      return 0
    }
    return new BigNumber(new BigNumber(amount).minus(gas).toFixed(8)).toString()
  }, [amount, gas])

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: WithdrawRequestType) => {
      const response = await postWithdraw(payload)
      return response
    },
    onSuccess: () => {
      toast.success('Successful withdrawal')
      withdrawalForm.reset()
      queryClient.refetchQueries({
        queryKey: [QueryKeys.GET_WITHDRAWAL],
      })
      queryClient.refetchQueries({
        queryKey: [QueryKeys.GET_ME],
      })
    },
    onError: (error: MutationErrorProps) => {
      if (isAxiosError(error)) {
        if (error.response?.data) {
          const data = error.response.data
          if (data?.password) {
            withdrawalForm.setError('main_password', {
              message: 'Invalid field',
            })
          }
          if (data?.address) {
            withdrawalForm.setError('main_address', {
              message: 'Address not found',
            })
          }
          if (data?.balance) {
            withdrawalForm.setError('main_amount', {
              message: 'Insuficient balance',
            })
          }
        }
      }
    },
  })

  const onSubmit = useCallback(
    (data: MainWithdrawData) => {
      const formdata = {
        amount: Number(data.main_amount),
        to: {
          address: data.main_address,
        },
        password: data.main_password,
        wallet: {
          address:
            user?.wallets.find((wallet) => wallet.blockchain === 'solana')
              ?.address || '',
          symbol: 'usdc',
          blockchain: 'solana',
        },
      }
      mutate(formdata)
    },
    [mutate, user?.wallets],
  )

  const getUserBalance = useCallback(() => {
    return user?.balance.hot_wallet.solana.usdc ?? 0
  }, [user?.balance.hot_wallet])

  const handleAmountError = useCallback(
    (amountValue: BigNumber) => {
      const balance = new BigNumber(getUserBalance())
      if (amountValue.isEqualTo(0)) {
        withdrawalForm.setError('main_amount', {
          message: 'The amount to withdraw must be greater than 0',
        })
        return
      }

      if (amountValue.isGreaterThan(balance)) {
        withdrawalForm.setError('main_amount', {
          message: "You don't have enough balance",
        })
        return
      }
      withdrawalForm.clearErrors('main_amount')
    },
    [getUserBalance, withdrawalForm],
  )

  const setMinWithdrawValue = useCallback(() => {
    const value = new BigNumber(getUserBalance() ?? 0).dividedBy(10)

    withdrawalForm.setValue('main_amount', value.toString())
    handleAmountError(value)
  }, [getUserBalance, withdrawalForm, handleAmountError])

  const setHalfWithdrawValue = useCallback(() => {
    const value = new BigNumber(getUserBalance() ?? 0).dividedBy(2)

    withdrawalForm.setValue('main_amount', value.toString())
    handleAmountError(value)
  }, [getUserBalance, withdrawalForm, handleAmountError])

  const setMaxWithdrawValue = useCallback(() => {
    const maxVal = new BigNumber(getUserBalance() ?? 0)
    withdrawalForm.setValue('main_amount', maxVal.toString())
    handleAmountError(maxVal)
  }, [withdrawalForm, getUserBalance, handleAmountError])

  const handlePasteAddress = async () => {
    const response = await copyStringFromClipboard()
    withdrawalForm.setValue('main_address', response || '', {
      shouldValidate: true,
    })
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    const formattedValue = formatInputNumberWithSixDecimals(value)
    withdrawalForm.setValue('main_amount', formattedValue)

    const amountValue = new BigNumber(value)
    handleAmountError(amountValue)
  }

  return {
    form: { withdrawalForm, onSubmit },
    functions: {
      handlePasteAddress,
      setMinWithdrawValue,
      setMaxWithdrawValue,
      setHalfWithdrawValue,
      handleAmountChange,
      getUserBalance,
    },
    states: {
      user,
      amountToWithdraw,
      gas: new BigNumber(gas).toString(),
      total,
      isPending,
      disabledButton: !withdrawalForm.formState.isValid,
    },
    refs: {},
    translations: {},
  }
}

export default useMainWithdrawal
