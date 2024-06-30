import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { ClientEvents } from '@/commons/consts/socketKeys.ts'
import { useAuthStore } from '@/commons/stores'
import { doSignIn } from '@/pages/SignIn/store/actions'
import { ApiRequest, ApiResponse } from '@/pages/SignIn/types'
import * as Cookies from '@/services/cookieStorage'
import { wsEmit } from '@/services/socket.ts'

const useAuth = () => {
  const { logIn, logOut } = useAuthStore((store) => store)
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: async (payload: ApiRequest.SignInRequestType) => {
      const response = await doSignIn(payload)
      return response
    },
    onSuccess: (response: ApiResponse.SignInResponseType) => {
      const { accessToken, refreshToken } = response.data
      Cookies.storeToken(accessToken, refreshToken)

      logIn()
      wsEmit(ClientEvents.LOGIN, accessToken)
      navigate('/')
    },
  })

  const doLogin = (payload: ApiRequest.SignInRequestType) => {
    mutate(payload)
  }

  const doLogOut = () => {
    Cookies.clearTokens()
    logOut()

    wsEmit(ClientEvents.LOGOUT)

    navigate('/')
  }

  return {
    doLogin,
    doLogOut,
  }
}

export default useAuth
