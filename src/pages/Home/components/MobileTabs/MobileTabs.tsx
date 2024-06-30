import TableComponent from '@/components/AcitivityTable/AcitivityTable'
import { Tabs } from '@/components/Tabs/Tabs'
import Chatroom from '@/pages/Home/components/Chatroom/components/Chatroom.tsx'

import LiveBet from '../LiveBet/LiveBet'

const MobileTabs = () => {
  const tabsData = [
    {
      label: 'Bet',
      content: <LiveBet />,
    },
    {
      label: 'Activity',
      content: <TableComponent />,
    },
    {
      label: 'Chat',
      content: <Chatroom />,
    },
  ]

  return <Tabs tabs={tabsData} />
}

export default MobileTabs
