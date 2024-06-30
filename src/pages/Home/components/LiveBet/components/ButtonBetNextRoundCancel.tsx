import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import Button from '@/components/Button/Button'
import { withFirstDepositVerification } from '@/helpers/withFirstDepositVerification'

const ButtonBetNextRoundCancel = () => {
  const { userBetNextRound, setUserBetNextRound } = useWSBetStore()

  if (!userBetNextRound) {
    return null
  }

  const handleOnPress = () => {
    setUserBetNextRound(null)
  }

  return (
    <Button
      label={`Betting (cancel)`}
      size="large"
      variant="primary"
      onClick={() => withFirstDepositVerification(handleOnPress)}
    />
  )
}

export { ButtonBetNextRoundCancel }
