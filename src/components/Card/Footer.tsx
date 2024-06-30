import { ComponentProps, PropsWithChildren } from 'react'

import { cn } from '@/helpers/tailwindMerge'

type Props = ComponentProps<'footer'>

const Footer = (props: PropsWithChildren<Props>) => {
  return <footer className={cn(props.className)}>{props.children}</footer>
}

export default Footer
