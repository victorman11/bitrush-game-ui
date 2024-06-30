import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'

export function useEmailVerificationCountDown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [isEnded, setIsEnded] = useState(false)

  const totalSeconds = 1 * 60 // 1 minute
  const currentSeconds = totalSeconds - amountSecondsPassed

  const seconds = String(currentSeconds).padStart(2, '0')

  function restartTime() {
    setIsEnded(false)
    setAmountSecondsPassed(0)
  }

  useEffect(() => {
    if (isEnded) {
      document.title = `Crashouse`
    } else {
      document.title = `Crashouse (${seconds} sec)`
    }
  }, [seconds, isEnded])

  useEffect(() => {
    const date = new Date()

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(new Date(), date)

      if (secondsDifference >= totalSeconds) {
        setAmountSecondsPassed(totalSeconds)
        setIsEnded(true)
        clearInterval(interval)
      } else {
        setAmountSecondsPassed(secondsDifference)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
      document.title = `Crashouse`
    }
  }, [totalSeconds, isEnded])

  return {
    seconds,
    isEnded,
    restartTime,
  }
}
