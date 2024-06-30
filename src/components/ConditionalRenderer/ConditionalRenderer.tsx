import { ReactNode } from 'react'

interface Props {
  condition: boolean
  whenTrue: ReactNode
  whenFalse: ReactNode
}

export function ConditionalRenderer({ condition, whenTrue, whenFalse }: Props) {
  if (condition) {
    return whenTrue
  } else {
    return whenFalse
  }
}
