import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import RenderIf from '../RenderIf/RenderIf'
import DesktopHeader from './components/DesktopHeader'
import MobileHeader from './components/MobileHeader'

type HeaderProps = {
  onlyLogo?: boolean
}

export default function Header({ onlyLogo = false }: HeaderProps) {
  const { isDesktop, isMobile, isTablet } = useDeviceWidth()

  return (
    <>
      <RenderIf isTrue={isDesktop}>
        <DesktopHeader onlyLogo={onlyLogo} />
      </RenderIf>
      <RenderIf isTrue={isMobile || isTablet}>
        <MobileHeader onlyLogo={onlyLogo} />
      </RenderIf>
    </>
  )
}
