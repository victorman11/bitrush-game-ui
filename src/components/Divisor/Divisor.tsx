import { ComponentProps } from 'react'

import { cn } from '@/helpers/tailwindMerge'

type DivisorProps = {
  text?: string
} & ComponentProps<'div'>

const Divisor = (props: DivisorProps) => {
  if (props.text) {
    return (
      <div
        className={cn(
          'flex flex-1 flex-row items-center py-1',
          props.className,
        )}
      >
        <div className="flex h-[1px] flex-1 bg-bitrush-neutral-600" />
        <p className="typography-xs px-2 font-light text-bitrush-neutral-300">
          {props.text}
        </p>
        <div className="flex h-[1px] flex-1 bg-bitrush-neutral-600" />
      </div>
    )
  }

  return (
    <div
      {...props}
      className={`h-[1px] w-[100%] bg-bitrush-neutral-600 ${props.className}`}
    />
  )
}

export default Divisor
