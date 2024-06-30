import { isAxiosError } from 'axios'

import { Error } from '@/commons/types'
import { entries } from '@/helpers/objectHelpers'

const handleMutationErros = (error: Error.MutationErrorProps) => {
  if (error && isAxiosError(error)) {
    if (error.response) {
      if (error.response.data?.errors) {
        return entries<{ [key: string]: string }>(
          error.response?.data.errors,
        ).map(([key, value]) => {
          return { key, value }
        })
      } else if (error.response.data?.error) {
        return [{ key: 'root', value: error.response.data.error }]
      }
    }
  }
  return null
}

export { handleMutationErros }
