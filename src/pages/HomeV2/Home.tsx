import './styles.css'

import { useGameHistoryStore } from '@/commons/stores'
import { ChartNew } from '@/components/Chart/ChartNew'
import { GameHistoryTable } from '@/components/GameHistoryTable/GameHistoryTable'
import Header from '@/components/Header/Header'
import { cn } from '@/helpers/tailwindMerge'

import AuthSection from './components/AuthSection/AuthSection'
import { CountryDisclaimerModal } from './components/CountryDisclaimerModal/CountryDisclaimerModal'
import { DesktopHome } from './components/DesktopHome/DesktopHome'
import MobileTabs from './components/MobileTabs/MobileTabs'
import useHome from './useHome'

function HomeV2() {
  const { states } = useHome()
  const { setShowLastPayoutOverlay } = useGameHistoryStore()

  if (states.isDesktop) {
    return (
      <>
        <DesktopHome isLoggedIn={states.isLoggedIn} />
        <CountryDisclaimerModal />
      </>
    )
  }

  return (
    <>
      <div
        className={cn(
          ` h-dvh px-4 lg:px-2`,
          !states.isDesktop ? 'flex flex-col' : '',
        )}
      >
        <CountryDisclaimerModal />
        <Header />

        <div className="flex flex-1 flex-col">
          <ChartNew />
          <div className="mt-2 flex min-h-0  flex-col">
            {states.isLoggedIn ? <MobileTabs /> : <AuthSection />}
          </div>
        </div>
        <GameHistoryTable onClose={() => setShowLastPayoutOverlay(false)} />
      </div>
    </>
  )
}

export default HomeV2
