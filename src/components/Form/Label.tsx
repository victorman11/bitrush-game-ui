import { LabelHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import mergeStyles from '@/helpers/mergeStyles'

type LabelProps = {
  disabled?: boolean
} & LabelHTMLAttributes<HTMLLabelElement>

export function Label(props: LabelProps) {
  const { getFieldState } = useFormContext()
  const { disabled = false, htmlFor = '' } = props

  const { invalid } = getFieldState(htmlFor)

  return (
    <div className={handleStyles(disabled, invalid)}>
      <label className="typography-xs m-0 p-0 text-center" {...props} />
    </div>
  )
}

const containerStyle = {
  base: 'border h-8 min-h-8 3xl:h-[3vw] 3xl:max-h-12 whitespace-nowrap py-1 px-4 rounded-l outline-none flex items-center justify-center text-center',
  defaultStyle:
    'bg-transparent border-bitrush-blue-700 transition-shadow placeholder-bitrush-blue-800 text-bitrush-blue-100',
  disabled:
    'bg-bitrush-neutral-500 border-bitrush-neutral-400 text-bitrush-neutral-400 placeholder-bitrush-neutral-400',
  invalid:
    'bg-transparent bg-bitrush-neutral-500 border-bitrush-red-500 text-bitrush-red-400 placeholder-bitrush-red-500',
}

const handleStyles = (disabled: boolean, invalid: boolean) => {
  if (disabled) {
    return mergeStyles(containerStyle.base, containerStyle.disabled)
  }

  if (invalid) {
    return mergeStyles(containerStyle.base, containerStyle.invalid)
  }

  return mergeStyles(containerStyle.base, containerStyle.defaultStyle)
}
