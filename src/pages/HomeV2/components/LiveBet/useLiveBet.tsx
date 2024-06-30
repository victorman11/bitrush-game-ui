// @ts-nocheck
// TODO remove ts-nocheck
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { ClientEvents } from '@/commons/consts/socketKeys.ts'
import { useAuthStore } from '@/commons/stores'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import { calcTargetProfit, calcWinRate } from '@/helpers/betCalculations'
import { formatInputNumber } from '@/helpers/formatDecimals'
import { withFirstDepositVerification } from '@/helpers/withFirstDepositVerification'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import { wsEmit } from '@/services/socket'

import { BetData, betSchema } from './schema'

const useLiveBet = () => {
  const { user, showFirstDeposit, setShowFirstDeposit } = useAuthStore()
  const { isMobile } = useDeviceWidth()
  const {
    userBet,
    userBetNextRound,
    betAllowed,
    setUserBetStatus,
    setUserBet,
    setUserBetNextRound,
  } = useWSBetStore()

  const liveBetForm = useForm<BetData>({
    resolver: zodResolver(betSchema),
    mode: 'onChange',
  })

  function sendBetNextRound(data: BetData) {
    setUserBetNextRound(data)
  }

  function sendBet(data: BetData) {
    wsEmit(ClientEvents.USER_BET, data)
    setUserBetStatus('betDone')
    setUserBet(data)
  }

  function handleBetNextRoundSubmit() {
    const submitFunc = liveBetForm.handleSubmit(sendBetNextRound)
    submitFunc()
  }

  function handleBetSubmit() {
    const submitFunc = liveBetForm.handleSubmit(sendBet)
    submitFunc()
  }

  function handleFillBet(size: 'min' | 'half' | 'max') {
    if (!user?.bits) {
      return
    }

    const values = {
      min: user?.bits * 0.1,
      half: user?.bits * 0.5,
      max: user?.bits * 1,
    }

    const betAmount = Math.floor(values[size]).toFixed(0)
    liveBetForm.setValue('bet', betAmount, { shouldValidate: true })
  }

  function handleTargetProfit() {
    try {
      return calcTargetProfit(
        Number(liveBetForm.watch('bet')),
        Number(liveBetForm.watch('payout')),
      )
    } catch (error) {
      return 0
    }
  }

  const handleWinRate = useCallback(() => {
    try {
      return calcWinRate(Number(liveBetForm.watch('payout')))
    } catch (error) {
      return 0
    }
  }, [liveBetForm])

  function handlePayoutChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    const formattedValue = formatInputNumber(value)

    liveBetForm.setValue('payout', formattedValue, { shouldValidate: true })
  }

  function handleBetChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    const formattedValue = formatInputNumber(value, true)

    liveBetForm.setValue('bet', formattedValue, { shouldValidate: true })
  }

  function isDisableFields() {
    return !!userBet || !!userBetNextRound
  }

  useEffect(() => {
    if (betAllowed && userBetNextRound) {
      wsEmit(ClientEvents.USER_BET, userBetNextRound)
      setUserBet(userBetNextRound)
      setUserBetNextRound(null)
    }
  }, [betAllowed, setUserBet, setUserBetNextRound, userBetNextRound])

  return {
    form: { liveBetForm },
    functions: {
      handleBetNextRoundSubmit,
      handleBetSubmit,
      handleFillBet,
      handlePayoutChange,
      handleBetChange,
      setShowFirstDeposit,
      withFirstDepositVerification,
    },
    states: {
      disableBetButton:
        !liveBetForm.formState.isValid ||
        !liveBetForm.watch('bet') ||
        !liveBetForm.watch('payout'),
      disableFields: isDisableFields(),
      targetProfit: handleTargetProfit(),
      winRate: handleWinRate(),
      isMobile,
      user,
      showFirstDeposit,
    },
    refs: {},
    translations: {},
  }
}

export default useLiveBet
