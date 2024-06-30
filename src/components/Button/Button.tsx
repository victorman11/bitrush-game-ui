import React from 'react'
import { TailSpin } from 'react-loader-spinner'

import mergeStyles from '@/helpers/mergeStyles'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick(): void
  label?: string
  variant?: 'primary' | 'stop' | 'play'
  size?: 'small' | 'large'
  loading?: boolean
}

const Button = (props: ButtonProps) => {
  const {
    disabled = false,
    onClick,
    label = '',
    variant = 'primary',
    size = 'small',
    loading = false,
  } = props

  // const baseStyle =
  //   "w-full  px-[32px] rounded-[2px] border text-white typography-xs font-light";
  const baseStyle =
    'w-full rounded-[2px] border text-white typography-xs font-light'

  const variants = {
    primary:
      'bg-gradient-to-r to-bitrush-blue-900 from-bitrush-blue-800 border-bitrush-blue-700 shadow-glow-blue hover:shadow-glow-blue-hovered transition-shadow',
    stop: 'bg-gradient-to-r to-bitrush-purple-900  from-bitrush-purple-800  border-bitrush-purple-700 shadow-glow-purple hover:shadow-glow-purple-hovered',
    play: 'bg-gradient-to-r to-bitrush-yellow-850 via-bitrush-yellow-700  from-bitrush-yellow-850  border-bitrush-yellow-400 shadow-glow-yellow hover:shadow-glow-yellow-hovered',
    disabled:
      'bg-bitrush-neutral-500 border-bitrush-neutral-400 text-bitrush-neutral-300 cursor-not-allowed',
  }

  // TODO REMOVE COMMENTS AFTER VALIDATION
  const sizes = {
    large: 'px-3 py-4 lg:py-[0.78vh]',
    small: 'px-2 py-2 lg:py-[0.78vh] ',
  }

  const styles = mergeStyles(
    baseStyle,
    variants[disabled || loading ? 'disabled' : variant],
    sizes[size],
    props?.className,
  )

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!disabled) {
      onClick()
    }
  }

  return (
    <button className={styles} onClick={handleOnClick}>
      {loading ? (
        <div className="flex items-center justify-center">
          <TailSpin
            visible={true}
            height="24"
            width="24"
            color="#0696FF"
            ariaLabel="tail-spin-loading"
            radius={1}
          />
        </div>
      ) : (
        label
      )}
    </button>
  )
}

export default Button
