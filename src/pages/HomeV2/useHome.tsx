import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CookieKeys, QueryKeys } from '@/commons/consts'
import { useAuthStore, useGameHistoryStore } from '@/commons/stores'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import * as Cookies from '@/services/cookieStorage'

import { getGameHistory, getMe, getUserGameHistory } from './store/actions'

const useHome = () => {
  const location = useLocation()
  const { isLoggedIn, logIn } = useAuthStore()
  const { setUserGameHistory } = useGameHistoryStore()
  const { isDesktop } = useDeviceWidth()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const affiliateCode = searchParams.get('affiliate')
    if (affiliateCode) {
      Cookies.setValueToCookie(CookieKeys.AFFILIATE_CODE_COOKIE, affiliateCode)
    }
  }, [location])

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
