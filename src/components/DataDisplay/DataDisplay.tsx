import { PropsWithChildren } from 'react'

import { cn } from '@/helpers/tailwindMerge'

type DataDisplayProps = PropsWithChildren<
  {
    variant?: 'disabled' | 'default'
  } & React.ComponentProps<'div'>
>

const DataDisplay = ({
  variant = 'default',
  className,
  children,
  ...rest
}: DataDisplayProps) => {
  const variants = {
    default: 'border border-bitrush-blue-700 bg-bitrush-neutral-800 px-3 py-2',
    disabled:
      'border border-bitrush-neutral-400 bg-bitrush-neutral-500 px-3 py-2',
  }

  return (
    <div {...rest} className={cn(variants[variant], className)}>
      {children}
    </div>
  )
}

export default DataDisplay
