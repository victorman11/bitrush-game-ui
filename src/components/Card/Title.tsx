import { ComponentProps, PropsWithChildren } from 'react'

import { cn } from '@/helpers/tailwindMerge'

type Title = ComponentProps<'div'>

const Title = (props: PropsWithChildren<Title>) => {
  return (
    <div
      className={cn(
        'typography-h2 text-bitrush-neutral-0 lg:typography-h1',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}

export default Title
