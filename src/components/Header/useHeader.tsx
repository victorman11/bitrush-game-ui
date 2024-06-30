import { useCallback, useEffect, useMemo, useState } from 'react'
import { PiShareNetworkBold } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthStore, useWSGameStore } from '@/commons/stores'

import CustomIcon from '../CustomIcon/CustomIcon'

interface UseHeaderProps {
  isMobile?: boolean
}

const useHeader = ({ isMobile = false }: UseHeaderProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { isLoggedIn, user } = useAuthStore()
  const { lastGameResult } = useWSGameStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const IconBaseStyle = 'w-[24px] h-[24px] lg:w-4 lg:h-4 fill-bitrush-blue-100'

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen((prev) => !prev)
  }, [])

  const closeMobileNav = useCallback(() => {
    navigate('/')
    setIsMobileNavOpen(false)
  }, [navigate])

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const showHamburguer = pathname === '/'

  const pathnameNormalized = pathname.replace('/', '')

  const showMobileTitleScreens = useMemo(
    () => ['stats', 'leaderboard', 'profile', 'settings'],
    [],
  )

  const showTitleInsteadOfLogo = useMemo(() => {
    return showMobileTitleScreens.includes(pathnameNormalized)
  }, [showMobileTitleScreens, pathnameNormalized])

  const links = [
    {
      name: 'Cashier',
      to: '/cashier',
      icon: <CustomIcon.WalletIcon className={IconBaseStyle} />,
    },
    {
      name: 'Cashier_v2',
      to: '/cashierv2',
      icon: <CustomIcon.WalletIcon className={IconBaseStyle} />,
    },
    {
      name: 'Stats',
      to: '/stats',
      icon: <CustomIcon.StatsIcon className={IconBaseStyle} />,
    },
    {
      name: 'Leaderboard',
      to: '/leaderboard',
      icon: <CustomIcon.TrophyIcon className={IconBaseStyle} />,
    },
    {
      name: 'My Profile',
      to: '/profile',
      icon: <CustomIcon.UserIcon className={IconBaseStyle} />,
    },
    {
      name: 'My Network',
      to: '/network',
      // icon: <CustomIcon.NetworkIcon className={IconBaseStyle} />,
      icon: <PiShareNetworkBold className={IconBaseStyle} />,
    },
    {
      name: 'Settings',
      to: '/settings',
      icon: <CustomIcon.SettingsIcon className={IconBaseStyle} />,
    },
  ]

  useEffect(() => {
    if (isMobile) {
      setIsMobileNavOpen(false)
    }
  }, [pathname, isMobile])

  return {
    functions: {
      closeMobileNav,
      toggleMobileNav,
      goBack,
    },
    constants: {
      links,
      showHamburguer,
      pathnameNormalized,
    },
    states: {
      isMobileNavOpen,
      isLoggedIn,
      user,
      lastGameResult,
      showTitleInsteadOfLogo,
    },
  }
}

export default useHeader
