import { ClientEvents } from '@/commons/consts/socketKeys.ts'
import { useWSGameStore } from '@/commons/stores'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import Button from '@/components/Button/Button'
import { calcTargetProfit } from '@/helpers/betCalculations'
import { withFirstDepositVerification } from '@/helpers/withFirstDepositVerification'
import { wsEmit } from '@/services/socket'

const ButtonBetCashIn = () => {
  const { chartDataSet, gameStatus } = useWSGameStore()
  const { userBet, setUserBet } = useWSBetStore()

  if (!userBet || gameStatus !== 'playing') {
    return null
  }

  const chartPayout = chartDataSet.data[chartDataSet.data.length - 1]
  const target = calcTargetProfit(Number(userBet.bet), chartPayout)

  const handleOnPress = () => {
    wsEmit(ClientEvents.USER_BET_STOP, chartPayout)
    setUserBet(null)
  }

  return (
    <Button
      label={`Cash in now: ${target}`}
      variant="stop"
      onClick={() => withFirstDepositVerification(handleOnPress)}
    />
  )
}

export { ButtonBetCashIn }
