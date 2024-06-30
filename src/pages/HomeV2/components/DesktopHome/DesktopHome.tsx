import AcitivityTable from '@/components/AcitivityTable/AcitivityTable'
import { ChartNew } from '@/components/Chart/ChartNew'
import Header from '@/components/Header/Header'
import { useWindowSize } from '@/hooks/useWindowSize'
import Chatroom from '@/pages/Home/components/Chatroom/components/Chatroom.tsx'

import ActivityTableHeader from '../ActivityTableHeader/ActivityTableHeader'
import AuthSection from '../AuthSection/AuthSection'
import LiveBet from '../LiveBet/LiveBet'

interface Props {
  isLoggedIn: boolean
}

const HEIGHT_PROPORTION = 0.5

function DesktopHome({ isLoggedIn }: Props) {
  const { height } = useWindowSize()
  const customHeight = Math.floor(height * HEIGHT_PROPORTION) - 30

  return (
    <>
      <div
        className="grid grid-cols-[50%_50%] grid-rows-[auto_44vh_1fr] 
        [grid-template-areas:'header-area_header-area''game-area_bet-area''activity-area_chat-area'] lg:overflow-hidden"
        style={{ height }}
      >
        <div className="header-area px-4">
          <Header />
        </div>

        <div className="game-area pb-3 pl-4 pr-3">
          <ChartNew />
        </div>
        <div className="bet-area pb-3 pl-3 pr-4">
          {isLoggedIn ? <LiveBet /> : <AuthSection />}
        </div>
        <div
          className="activity-area pb-4 pl-4 pr-3 pt-3"
          style={{ height: customHeight }}
        >
          <AcitivityTable headerRight={<ActivityTableHeader />} />
        </div>
        <div
          className="chat-area pb-4 pl-3 pr-4 pt-3"
          style={{ height: customHeight }}
        >
          <Chatroom />
        </div>
      </div>
    </>
  )
}

export { DesktopHome }
