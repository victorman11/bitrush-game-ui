import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore, useGameHistoryStore } from '@/commons/stores'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import * as Cookies from '@/services/cookieStorage'

import { getGameHistory, getMe, getUserGameHistory } from './store/actions'

const useHome = () => {
  const { isLoggedIn, logIn } = useAuthStore()
  const { setUserGameHistory } = useGameHistoryStore()
  const { isDesktop } = useDeviceWidth()

  useQuery({
    queryFn: () => getMe(),
    queryKey: [QueryKeys.GET_ME],
    enabled: isLoggedIn,
  })

  const { data: userGameHistory } = useQuery({
    queryFn: () => (isLoggedIn ? getUserGameHistory() : getGameHistory()),
    queryKey: [QueryKeys.GET_USER_GAME_HISTORY],
  })

  useEffect(() => {
    if (userGameHistory?.data.length) {
      setUserGameHistory(userGameHistory.data.filter((game) => game.finished))
    }
  }, [userGameHistory, setUserGameHistory])

  useEffect(() => {
    if (Cookies.isTokenCookieSaved()) {
      logIn()
    }
  }, [logIn])

  return {
    states: {
      isLoggedIn,
      isDesktop,
    },
  }
}

export default useHome
