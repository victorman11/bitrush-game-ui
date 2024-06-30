import { useCallback, useEffect, useMemo, useState } from 'react'

function useTimedVisibility(initialVisibility = false, duration = 20000) {
  const [visible, setVisible] = useState(initialVisibility)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [finished, setFinished] = useState(false)
  const [running, setRunning] = useState(false)

  const toggleVisibility = useCallback(() => {
    if (running && !finished) return
    setVisible((prevVisible) => !prevVisible)
  }, [finished, running])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (visible) {
      setRunning(true)
      timer = setTimeout(() => {
        setVisible(false)
        setFinished(true)
        setRunning(false)
      }, timeLeft)
    }

    return () => clearTimeout(timer)
  }, [visible, timeLeft])

  useEffect(() => {
    if (visible) {
      setTimeLeft(duration)
      setFinished(false)
    }
  }, [visible, duration])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (visible) {
      setRunning(true)
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1000
          return newTimeLeft >= 0 ? newTimeLeft : 0
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [visible])

  const formattedTimeLeft = useMemo(
    () => `${Math.floor(timeLeft / 1000)}s`,
    [timeLeft],
  )

  return {
    visible,
    timeLeft: formattedTimeLeft,
    finished,
    running,
    toggleVisibility,
  }
}

export default useTimedVisibility
