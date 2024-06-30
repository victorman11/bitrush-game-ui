import Button from '../../../../components/Button/Button'
import useTemp from './useTemp'

const Temp = () => {
  const { functions, states } = useTemp()

  if (!states.isLoggedIn) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 10,
      }}
    >
      <Button label="Deposit Fake RUSH" onClick={functions.handleOnAddBits} />
    </div>
  )
}

export default Temp
