import ApiService from '@/services/api'

import { AffiliateValidationRequestType } from '../types/apiRequest'

export const postValidateAffiliateCode = async (
  payload: AffiliateValidationRequestType,
): Promise<null> => {
  const url = `/users/network/${payload.affiliateCode}/validate`

  const response = await new ApiService().post<null, null>(url, null)

  return response
}
