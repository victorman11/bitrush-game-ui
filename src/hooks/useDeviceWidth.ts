import { MOBILE_WIDTH, TABLET_WIDTH } from '../helpers/deviceWidth'
import { useWindowSize } from './useWindowSize'

export function useDeviceWidth() {
  const { width } = useWindowSize()

  const isMobile = MOBILE_WIDTH >= width
  const isTablet = TABLET_WIDTH >= width

  const isDesktop = !isMobile && !isTablet

  return { isMobile, isTablet, isDesktop }
}
