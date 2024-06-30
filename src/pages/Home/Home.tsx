import AcitivityTable from '@/components/AcitivityTable/AcitivityTable'
import { ChartNew } from '@/components/Chart/ChartNew'
import Header from '@/components/Header/Header'
import RenderIf from '@/components/RenderIf/RenderIf'
import Chatroom from '@/pages/Home/components/Chatroom/components/Chatroom.tsx'

import ActivityTableHeader from './components/ActivityTableHeader/ActivityTableHeader'
import AuthSection from './components/AuthSection/AuthSection'
import { CountryDisclaimerModal } from './components/CountryDisclaimerModal/CountryDisclaimerModal'
import LiveBet from './components/LiveBet/LiveBet'
import MobileTabs from './components/MobileTabs/MobileTabs'
import useHome from './useHome'

function App() {
  const { states } = useHome()

  return (
    <div className="h-dvh">
      <CountryDisclaimerModal />
      <div className="flex h-full flex-col p-4">
        <Header />
        <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2  lg:grid-rows-[50dvh,1fr]">
          <RenderIf isTrue={!states.isDesktop}>
            <ChartNew />

            <MobileTabs />
          </RenderIf>

          <RenderIf isTrue={states.isDesktop}>
            <ChartNew />
            {states.isLoggedIn ? <LiveBet /> : <AuthSection />}
            <AcitivityTable headerRight={<ActivityTableHeader />} />

            <Chatroom />
          </RenderIf>
        </div>
      </div>
    </div>
  )
}

export default App
