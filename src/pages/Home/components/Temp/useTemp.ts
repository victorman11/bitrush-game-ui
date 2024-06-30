/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { queryClient } from '@/components/Providers/Providers'
import ApiService from '@/services/api'

const useTemp = () => {
  const { isLoggedIn } = useAuthStore()
  const [user] = useState({})

  const handleGetMe = async () => {
    queryClient.refetchQueries({ queryKey: [QueryKeys.GET_ME] })
  }

  const handleOnAddBits = async () => {
    const response = await new ApiService().post<any, any>('/cashier/deposit', {
      bits: 1000,
      btc: 0.001,
    })

    queryClient.refetchQueries({
      queryKey: [QueryKeys.GET_ME],
    })

    console.log('response', response)
  }

  return {
    functions: {
      handleGetMe,
      handleOnAddBits,
    },
    states: {
      isLoggedIn,
      user,
    },
  }
}

export default useTemp
