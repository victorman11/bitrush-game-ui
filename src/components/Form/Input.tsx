import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

import { cn } from '@/helpers/tailwindMerge'

import RenderIf from '../RenderIf/RenderIf'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder: string
  showPassword?: boolean
  suggestions?: string[]
}

export function Input({
  disabled = false,
  name,
  showPassword = false,
  ...props
}: InputProps) {
  const { watch, clearErrors, getFieldState, setValue, register } =
    useFormContext()
  const [isToggled, setIsToggled] = useState(true)
  const { invalid } = getFieldState(name)
  const [suggestion, setSuggestion] = useState('')
  const [fullSuggestion, setFullSuggestion] = useState('')

  const inputValue = watch(name)

  useEffect(() => {
    if (props.suggestions && props.suggestions.length > 0) {
      const lastAtPos = inputValue?.lastIndexOf('@')
      let query = ''
      if (lastAtPos > -1) {
        query = inputValue.substring(lastAtPos + 1)
      }
      if (query.length > 0) {
        const suggestion = props.suggestions.find((username) =>
          username.toLowerCase().startsWith(query.toLowerCase()),
        )
        if (suggestion) {
          setSuggestion(suggestion.substring(query.length))
          setFullSuggestion(suggestion)
        } else {
          setSuggestion('')
          setFullSuggestion('')
        }
      } else {
        setSuggestion('')
        setFullSuggestion('')
      }
    }
  }, [inputValue, props.suggestions])

  const handleKeyDown = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event?: any) => {
      if ((!event || event.key === 'Tab') && suggestion) {
        event?.preventDefault()
        const lastAtPos = inputValue?.lastIndexOf('@')
        setValue(
          name,
          inputValue.substring(0, lastAtPos + 1) + fullSuggestion + ' ',
          {
            shouldValidate: true,
          },
        )
        setSuggestion('')
        setFullSuggestion('')
      }

      if (
        props.type === 'number' &&
        (event?.key === '+' || event?.key === '-')
      ) {
        event?.preventDefault()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [suggestion, setValue, name, inputValue],
  )

  useEffect(() => {
    clearErrors(name)
  }, [disabled, clearErrors, name, setValue])

  const toggle = useCallback(() => {
    setIsToggled((prevState) => {
      return !prevState
    })
  }, [])

  const inputStyle = useMemo(
    () => ({
      base: 'w-full h-full bg-transparent outline-none typography-xs p-2',
      disabled: 'text-bitrush-neutral-400 placeholder-bitrush-neutral-400',
      invalid: 'text-bitrush-red-400 placeholder-bitrush-red-500',
    }),
    [],
  )

  const containerStyle = useMemo(
    () => ({
      base: 'w-full bg-transparent border outline-none border-bitrush-blue-700 transition-shadow h-8 min-h-8 3xl:h-[3vw] 3xl:max-h-12 typography-xs rounded-r flex-row flex items-center relative',
      focused:
        'focus:shadow-glow-blue-hovered  focus:placeholder-bitrush-blue-700',
      hovered: 'hover:shadow-glow-blue-hovered',
      disabled:
        'bg-bitrush-neutral-500 border-bitrush-neutral-400 text-bitrush-neutral-400 placeholder-bitrush-neutral-400',
      invalid:
        'border-bitrush-red-500 text-bitrush-red-400 placeholder-bitrush-red-500',
      invalidFocused:
        'focus:shadow-glow-red-hovered  focus:placeholder-bitrush-red-700',
    }),
    [],
  )

  const handleInputClassName = useCallback(() => {
    if (disabled) {
      return cn(inputStyle.base, inputStyle.disabled)
    }

    if (invalid) {
      return cn(inputStyle.base, inputStyle.invalid)
    }

    return cn(inputStyle.base)
  }, [inputStyle, disabled, invalid])

  const handleClassName = useCallback(() => {
    if (disabled) {
      return cn(containerStyle.base, containerStyle.disabled)
    }

    if (invalid) {
      return cn(
        containerStyle.base,
        containerStyle.invalid,
        containerStyle.invalidFocused,
        containerStyle.hovered,
      )
    }

    return cn(
      containerStyle.base,
      containerStyle.focused,
      containerStyle.hovered,
    )
  }, [containerStyle, disabled, invalid])

  return (
    <div className={handleClassName()}>
      <input
        id={name}
        {...register(name)}
        {...props}
        className={handleInputClassName()}
        type={isToggled ? props.type : 'text'}
        onKeyDown={handleKeyDown}
        onClick={() => {
          suggestion && handleKeyDown()
        }}
        autoCapitalize="off"
      />
      <RenderIf isTrue={!!suggestion}>
        <span className="z-1 pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 transform text-transparent">
          {inputValue}
          <span className="text-bitrush-neutral-300">{suggestion}</span>
        </span>
      </RenderIf>
      <RenderIf isTrue={showPassword}>
        <a onClick={() => toggle()}>
          {isToggled ? (
            <FaEye className="typography-base mx-2 cursor-pointer text-bitrush-blue-700" />
          ) : (
            <FaEyeSlash className="typography-base mx-2 cursor-pointer text-bitrush-blue-700" />
          )}
        </a>
      </RenderIf>
    </div>
  )
}
