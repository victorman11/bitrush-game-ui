import { HTMLAttributes } from 'react'

interface ContainterProps extends HTMLAttributes<HTMLDivElement> {}

export function Container(props: ContainterProps) {
  return <div className="" {...props} />
}
