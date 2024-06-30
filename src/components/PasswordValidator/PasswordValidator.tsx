import { useMemo } from 'react'

type PasswordValidator = {
  password: string
}

function PasswordValidator({ password = '' }: PasswordValidator) {
  const errors = useMemo(() => {
    const errors = {
      min: true,
      capLetter: true,
      number: true,
    }

    if (password.length >= 8) {
      errors.min = false
    } else {
      errors.min = true
    }

    if (/[A-Z]/.test(password)) {
      errors.capLetter = false
    } else {
      errors.capLetter = true
    }

    if (/\d/.test(password)) {
      errors.number = false
    } else {
      errors.number = true
    }

    return errors
  }, [password])

  const validStyle = 'typography-xs text-bitrush-green-500'
  const invalidStyle = 'typography-xs text-bitrush-normal-0'

  return (
    <p className="typography-xs mt-2">
      <span className={`${errors.min ? invalidStyle : validStyle}`}>
        8 caracters min
      </span>
      ,{' '}
      <span className={`${errors.capLetter ? invalidStyle : validStyle}`}>
        1 cap letter
      </span>
      <br />
      and{' '}
      <span className={`${errors.number ? invalidStyle : validStyle}`}>
        1 number at least
      </span>
    </p>
  )
}

export default PasswordValidator
