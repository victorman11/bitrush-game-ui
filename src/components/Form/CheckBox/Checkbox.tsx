import './styles.css'

import { InputHTMLAttributes, PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'

type CheckboxProps = {
  name: string
} & InputHTMLAttributes<HTMLInputElement> &
  PropsWithChildren

const Checkbox = (props: CheckboxProps) => {
  const { children, name } = props
  const { register } = useFormContext()

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <label className="custom-checkbox">
          <input type="checkbox" {...register(name)} checked={props.checked} />
          <span className="checkmark absolute left-0 top-0 h-6 w-6 rounded border border-bitrush-blue-700 bg-transparent outline-none hover:shadow-glow-blue-hovered" />
        </label>
      </div>
      {children}
    </div>
  )
}

export default Checkbox
