import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import BigNumber from 'bignumber.js'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
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

import { WithdrawData, withdrawSchema } from '../../schema'
import { useWithdrawalSocketStore } from '../../store/useWithdrawalSocketStore'

const useWithdrawal = () => {
  const [selectedCurrency, setSelectedCurrency] = useState({
    blockchain: '',
    symbol: '',
  })
  const { user } = useAuthStore()
  const { data: withdrawSymbolData } = useWithdrawalSocketStore()
  const currentGasAndFee = selectedCurrency.blockchain
    ? withdrawSymbolData[selectedCurrency.blockchain][selectedCurrency.symbol]
    : null

  const withdrawalForm = useForm<WithdrawData>({
    resolver: zodResolver(withdrawSchema),
    mode: 'onChange',
  })

  const amount = withdrawalForm.watch('amount')

  const amountToWithdraw = amount || 0

  const fee = useMemo(() => {
    const currentFee = currentGasAndFee?.exchange?.value
    const multipler = currentFee ? currentFee / 100 : 0

    if (multipler === 0 || !amount) return multipler

    return Number(amount) * multipler
  }, [currentGasAndFee?.exchange, amount])

  const gas = useMemo(() => {
    const currentGas = currentGasAndFee?.gas?.value

    return currentGas || 0
  }, [currentGasAndFee?.gas])

  const total = useMemo(() => {
    if (!amount || !fee) {
      return 0
    }
    return new BigNumber(
      new BigNumber(amount).minus(fee).minus(gas).toFixed(8),
    ).toString()
  }, [amount, fee, gas])

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: WithdrawRequestType) => {
      const response = await postWithdraw(payload)
      return response
    },
    onSuccess: () => {
      toast.success('Successful withdrawal')
      withdrawalForm.reset()
      setSelectedCurrency({ blockchain: '', symbol: '' })

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
            withdrawalForm.setError('password', { message: 'Invalid field' })
          }
          if (data?.address) {
            withdrawalForm.setError('address', { message: 'Address not found' })
          }
          if (data?.balance) {
            withdrawalForm.setError('amount', {
              message: 'Insuficient balance',
            })
          }
        }
      }
    },
  })

  const onSubmit = useCallback(
    (data: WithdrawData) => {
      const blockchain = selectedCurrency.blockchain.toLocaleLowerCase()
      const formdata = {
        wallet: {
          symbol: selectedCurrency.symbol.toLowerCase(),
          blockchain,
          address:
            user?.wallets.find((wallet) => wallet.blockchain === blockchain)
              ?.address || '',
        },
        to: {
          address: data.address,
        },
        amount: Number(data.amount),
        password: data.password,
      }
      mutate(formdata)
    },
    [
      mutate,
      selectedCurrency.blockchain,
      selectedCurrency.symbol,
      user?.wallets,
    ],
  )

  const getUserBalance = useCallback(() => {
    if (selectedCurrency.blockchain === '' || selectedCurrency.symbol === '')
      return 0

    return (
      user?.balance.hot_wallet[selectedCurrency.blockchain][
        selectedCurrency.symbol.toLowerCase()
      ] ?? 0
    )
  }, [
    selectedCurrency.blockchain,
    selectedCurrency.symbol,
    user?.balance.hot_wallet,
  ])

  const handleAmountError = useCallback(
    (amountValue: BigNumber) => {
      const balance = new BigNumber(getUserBalance())

      if (amountValue.isEqualTo(0)) {
        withdrawalForm.setError('amount', {
          message: 'The amount to withdraw must be greater than 0',
        })
        return
      }

      if (amountValue.isGreaterThan(balance)) {
        withdrawalForm.setError('amount', {
          message: "You don't have enough balance",
        })
        return
      }
      withdrawalForm.clearErrors('amount')
    },
    [getUserBalance, withdrawalForm],
  )

  const setMinWithdrawValue = useCallback(() => {
    const value = new BigNumber(getUserBalance() ?? 0).dividedBy(10)

    withdrawalForm.setValue('amount', value.toString())
    handleAmountError(value)
  }, [getUserBalance, withdrawalForm, handleAmountError])

  const setHalfWithdrawValue = useCallback(() => {
    const value = new BigNumber(getUserBalance() ?? 0).dividedBy(2)
    withdrawalForm.setValue('amount', value.toString())
    handleAmountError(value)
  }, [getUserBalance, withdrawalForm, handleAmountError])

  const setMaxWithdrawValue = useCallback(() => {
    const value = new BigNumber(getUserBalance() ?? 0)
    withdrawalForm.setValue('amount', value.toString())
    handleAmountError(value)
  }, [withdrawalForm, getUserBalance, handleAmountError])

  const handlePasteAddress = async () => {
    const response = await copyStringFromClipboard()
    withdrawalForm.setValue('address', response || '', { shouldValidate: true })
  }

  function handleWithdrawNetworkChange({
    blockchain,
    symbol,
  }: {
    blockchain: string
    symbol: string
  }) {
    setSelectedCurrency({
      blockchain,
      symbol,
    })
    withdrawalForm.setValue('amount', '')
    withdrawalForm.clearErrors('amount')
  }

  function getExchangeFee() {
    let content = ''
    if (currentGasAndFee?.exchange) {
      content =
        currentGasAndFee?.exchange.type === 'percentage'
          ? `${currentGasAndFee?.exchange.value}%`
          : `${currentGasAndFee?.exchange.value}`
    }

    return content
  }

  function getCurrency() {
    return selectedCurrency.symbol.toUpperCase()
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    const formattedValue = formatInputNumberWithSixDecimals(value)
    withdrawalForm.setValue('amount', formattedValue)

    const amountValue = new BigNumber(value)
    handleAmountError(amountValue)
  }

  return {
    form: { withdrawalForm, onSubmit },
    functions: {
      setMinWithdrawValue,
      setMaxWithdrawValue,
      setHalfWithdrawValue,
      handlePasteAddress,
      handleWithdrawNetworkChange,
      getExchangeFee,
      getCurrency,
      getUserBalance,
      handleAmountChange,
    },
    states: {
      user,
      amountToWithdraw,
      total,
      fee: new BigNumber(fee).toString(),
      gas: new BigNumber(gas).toString(),
      isPending,
      currentGasAndFee,
      disabledButton:
        !withdrawalForm.formState.isValid || selectedCurrency.symbol === '',
    },
    refs: {},
    translations: {},
  }
}

export default useWithdrawal
