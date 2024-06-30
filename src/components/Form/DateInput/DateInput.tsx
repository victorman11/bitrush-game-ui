import { format } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FaRegCalendarAlt } from 'react-icons/fa'
import InputMask from 'react-input-mask'

import { Calendar } from '@/components/Calendar/Calendar'
import { cn } from '@/helpers/tailwindMerge'

import { isBelowEighteen } from './helpers'

type DateInputProps = {
  name: string
}

const DateInput = (props: DateInputProps) => {
  const { getFieldState, setValue, setError, clearErrors, register } =
    useFormContext()

  const [isToggled, setIsToggled] = useState(false)
  const [selectedDay, setSelected] = useState<Date>(new Date())

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
      base: 'w-full bg-transparent border outline-none border-bitrush-blue-700 transition-shadow h-8 min-h-8 3xl:h-[3vw] 3xl:max-h-12  typography-xs rounded-r flex-row flex items-center md:relative',
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
    const { invalid } = getFieldState(props.name)

    if (invalid) {
      return cn(inputStyle.base, inputStyle.invalid)
    }

    return cn(inputStyle.base)
  }, [inputStyle, getFieldState, props.name])

  const handleClassName = useCallback(() => {
    const { invalid } = getFieldState(props.name)
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
  }, [containerStyle, getFieldState, props.name])

  const toggle = useCallback(() => {
    setIsToggled((prev) => !prev)
    clearErrors(props.name)
  }, [clearErrors, props.name])

  const onSelect = useCallback(() => {
    const formatedDate = format(selectedDay, 'dd/MM/yyyy')
    setValue(props.name, formatedDate)
    setIsToggled(false)

    if (isBelowEighteen(formatedDate)) {
      setError(props.name, {
        message: 'You must be 18 years old or above to create an account',
      })
    } else {
      clearErrors(props.name)
    }
  }, [setValue, props.name, selectedDay, setError, clearErrors])

  return (
    <div className={handleClassName()}>
      <InputMask
        mask={'99/99/9999'}
        alwaysShowMask={false}
        maskPlaceholder={null}
        type="text"
        placeholder="dd/mm/yyyy"
        className={handleInputClassName()}
        // react hook form register
        {...props}
        {...register(props.name)}
      />
      <FaRegCalendarAlt
        className="typography-base mr-2 cursor-pointer text-bitrush-blue-700"
        onClick={toggle}
      />
      <Calendar
        onSelect={onSelect}
        visible={isToggled}
        onDayClick={setSelected}
        selected={selectedDay}
      />
    </div>
  )
}

export default DateInput
