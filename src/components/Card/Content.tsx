import { ComponentProps, PropsWithChildren } from 'react'

import { cn } from '@/helpers/tailwindMerge'

type Props = ComponentProps<'div'>

const Content = (props: PropsWithChildren<Props>) => {
  return <div className={cn(props.className)}>{props.children}</div>
}

export default Content
