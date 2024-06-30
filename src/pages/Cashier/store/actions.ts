import { useDepositStore } from '@/commons/stores/depositStore'
import { useWithdrawalStore } from '@/commons/stores/withdrawalStore.ts'
import ApiService from '@/services/api'

import { ApiResponse } from '../types'

export const postDeposit = async (
  data: ApiResponse.DepositRequestType,
): Promise<ApiResponse.DepositResponseType> => {
  const url = '/cashier/deposit'
  const response = await new ApiService().post<
    ApiResponse.DepositRequestType,
    ApiResponse.DepositResponseType
  >(url, data)

  return response
}

export const getDeposit = async (
  limit = 30,
  offset = 0,
): Promise<ApiResponse.GetDepositResponseType> => {
  const url = `/cashier/deposit?limit=${limit + 1}&offset=${offset}`
  const response =
    await new ApiService().get<ApiResponse.GetDepositResponseType>(url)

  const newData = response.data.slice(0, limit)
  useDepositStore.setState((state) => ({
    deposits: offset === 0 ? newData : [...state.deposits, ...newData],
    depositsHasMoreRows: response.data.length > limit,
  }))

  return response
}

export const postWithdraw = async (
  data: ApiResponse.WithdrawRequestType,
): Promise<Record<string, null>> => {
  const url = '/cashier/withdraw'
  const response = await new ApiService().post<
    ApiResponse.WithdrawRequestType,
    Record<string, null>
  >(url, data)

  return response
}

export const getWithdrawal = async (
  limit = 30,
  offset = 0,
): Promise<ApiResponse.GetWithdrawalResponseType> => {
  const url = `/cashier/withdraw?limit=${limit + 1}&offset=${offset}`
  const response =
    await new ApiService().get<ApiResponse.GetWithdrawalResponseType>(url)

  const newData = response.data.slice(0, limit)
  useWithdrawalStore.setState((state) => ({
    withdrawals: offset === 0 ? newData : [...state.withdrawals, ...newData],
    withdrawalsHasMoreRows:
      response.data.length !== 0 && response.data.length > limit,
  }))

  return response
}

export const getWithdrawalTotal =
  async (): Promise<ApiResponse.GetWithdrawalTotalResponseType> => {
    const url = '/cashier/withdrawtotal'
    const response =
      await new ApiService().get<ApiResponse.GetWithdrawalTotalResponseType>(
        url,
      )

    useWithdrawalStore.setState({ withdrawalsTotal: response.data })

    return response
  }

export const getMinimumDeposits =
  async (): Promise<ApiResponse.GetMinimumDepositsResponseType> => {
    const url = '/v2/cashier/deposit/minimum'
    const response =
      await new ApiService().get<ApiResponse.GetMinimumDepositsResponseType>(
        url,
      )

    useDepositStore.getState().setMinimumDeposits(response)

    return response
  }
