import { useWSGameStore } from '@/commons/stores'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import Button, { ButtonProps } from '@/components/Button/Button'

const ButtonBet = (props: ButtonProps) => {
  const { userBet, userBetNextRound } = useWSBetStore()
  const { gameStatus } = useWSGameStore()

  if (userBet || userBetNextRound || gameStatus !== 'starting') {
    return null
  }

  return <Button label="Bet" size="large" variant="play" {...props} />
}

export { ButtonBet }
