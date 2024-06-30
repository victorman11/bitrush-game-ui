import { useFormContext } from 'react-hook-form'
import ReactSlider from 'react-slider'

type SliderProps = {
  field: string
  disabled?: boolean
}

const Slider = (props: SliderProps) => {
  const { setValue, watch } = useFormContext()

  const { disabled = false } = props
  return (
    <ReactSlider
      disabled={disabled}
      min={1.01}
      max={10}
      step={0.01}
      // TODO REMOVE COMMENTS AFTER VALIDATION
      // className="flex items-center h-6 mt-4"
      className="flex h-[0.58vh] items-center "
      // trackClassName={`h-1 rounded ${handleClassNames(disabled)}`}
      trackClassName={`h-[0.4vh] rounded ${handleClassNames(disabled)}`}
      // thumbClassName={`rounded-full h-5 w-5 outline-none ${handleClassNames(
      thumbClassName={`rounded-full h-[1.6vh] w-[1.6vh] outline-none ${handleClassNames(
        disabled,
      )}`}
      value={Number(watch(props.field, 1.01))}
      renderThumb={(props) => <div {...props} />}
      onChange={(data) =>
        setValue(props.field, String(data), { shouldValidate: true })
      }
    />
  )
}

const enabledClassNames = 'bg-bitrush-blue-700 shadow-glow-blue-hovered'
const disabledClassNames = 'bg-bitrush-neutral-500 border-bitrush-neutral-400'
const handleClassNames = (disabled: boolean) => {
  if (disabled) {
    return disabledClassNames
  }
  return enabledClassNames
}

export { Slider }
