import { ComponentProps, PropsWithChildren } from 'react'

import mergeStyles from '@/helpers/mergeStyles'
import { cn } from '@/helpers/tailwindMerge'

type CardProps = {
  borderless?: boolean
} & ComponentProps<'div'>

const Card = ({
  borderless = false,
  className,
  children,
  ...rest
}: PropsWithChildren<CardProps>) => {
  // TODO REMOVE COMMENTS AFTER VALIDATION
  // const baseStyle = "w-full text-white bg-bitrush-neutral-900 p-4 h-auto";
  const baseStyle =
    'w-full text-white bg-bitrush-neutral-900 p-[2vh] 2xl:py-[2.34vh] h-auto'

  const border =
    borderless === true
      ? ''
      : 'rounded border border-solid border-bitrush-neutral-600'

  const style = mergeStyles(baseStyle, border)

  return (
    <div {...rest} className={cn(style, className)}>
      {children}
    </div>
  )
}

export default Card
