import { PropsWithChildren } from 'react'

import { cn } from '@/helpers/tailwindMerge'

type HeaderProps = {
  className?: string
  headerRight?: JSX.Element
}

const Header = (props: PropsWithChildren<HeaderProps>) => {
  return (
    // TODO REMOVE COMMENTS AFTER VALIDATION
    <div
      className={cn(
        'mb-[0.95vh] flex flex-row items-center justify-between 2xl:mb-[2.34vh]',
        props.className,
      )}
    >
      {props.children}
      {props.headerRight && props.headerRight}
    </div>
  )
}

export default Header
