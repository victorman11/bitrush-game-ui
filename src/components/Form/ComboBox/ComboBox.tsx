import { useFormContext } from 'react-hook-form'

import mergeStyles from '@/helpers/mergeStyles'

type ComboBoxDataType = [{ code: string; name: string }]

type ComboBoxProps = {
  name: string
  data: ComboBoxDataType
}

const ComboBox = (props: ComboBoxProps) => {
  const { getFieldState, register } = useFormContext()
  const mergedStyles = mergeStyles(baseStyle, focusedStyle, hoverStyle)

  const invalidMergedStyles = mergeStyles(
    baseStyle,
    invalidStyles,
    invalidFocusedStyle,
    invalidHoverStyle,
  )

  const handleClassName = () => {
    const { invalid } = getFieldState(props.name)

    if (invalid) {
      return invalidMergedStyles
    }

    return mergedStyles
  }

  return (
    <select
      defaultValue={'none'}
      className={handleClassName()}
      {...register(props.name)}
      {...props}
    >
      <option value="none">Select your Country</option>
      {props.data.map((item) => (
        <option key={item.code} value={item.code}>
          {item.name}
        </option>
      ))}
    </select>
  )
}

export { ComboBox }
export type { ComboBoxDataType }

const baseStyle =
  'w-full bg-transparent border outline-none border-bitrush-blue-700 transition-shadow h-8 pl-2 pr-2  typography-xs placeholder-bitrush-blue-800 rounded-r'

const focusedStyle =
  'focus:shadow-glow-blue-hovered  focus:placeholder-bitrush-blue-700'

const hoverStyle = 'hover:shadow-glow-blue-hovered  '

const invalidStyles =
  'bg-bitrush-neutral-500 border-bitrush-red-500 text-bitrush-red-400 placeholder-bitrush-red-500'

const invalidFocusedStyle =
  'focus:shadow-glow-red-hovered  focus:placeholder-bitrush-red-700'

const invalidHoverStyle = 'hover:shadow-glow-red-hovered  '
