import { useWSGameStore } from '@/commons/stores'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import Button, { ButtonProps } from '@/components/Button/Button'

const ButtonBetNextRound = (props: ButtonProps) => {
  const { userBet, userBetNextRound } = useWSBetStore()
  const { gameStatus } = useWSGameStore()

  if (gameStatus === 'starting' || userBet || userBetNextRound) {
    return null
  }

  return (
    <Button label="Bet (next round)" size="large" variant="play" {...props} />
  )
}

export { ButtonBetNextRound }
