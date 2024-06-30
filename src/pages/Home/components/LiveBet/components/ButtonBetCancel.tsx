import { ClientEvents } from '@/commons/consts/socketKeys.ts'
import { useWSGameStore } from '@/commons/stores'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import Button from '@/components/Button/Button'
import { withFirstDepositVerification } from '@/helpers/withFirstDepositVerification'
import { wsEmit } from '@/services/socket'

const ButtonBetCancel = () => {
  const { setUserBet, userBet } = useWSBetStore()
  const { gameStatus } = useWSGameStore()

  if (!userBet || gameStatus !== 'starting') {
    return null
  }

  const handleOnPress = () => {
    wsEmit(ClientEvents.USER_BET_CANCEL)
    setUserBet(null)
  }

  return (
    <Button
      label="Cancel my bet"
      size="large"
      variant="primary"
      onClick={() => withFirstDepositVerification(handleOnPress)}
    />
  )
}

export { ButtonBetCancel }
