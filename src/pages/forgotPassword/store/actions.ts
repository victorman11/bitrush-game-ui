import ApiService from '@/services/api'

import { ApiRequest } from '../types'

export const requestPasswordResetEmail = async (
  payload: ApiRequest.PasswordResetForm1,
): Promise<Record<string, null>> => {
  const url = '/auth/password/reset'

  const response = await new ApiService().post<
    ApiRequest.PasswordResetForm1,
    Record<string, null>
  >(url, payload)

  return response
}
