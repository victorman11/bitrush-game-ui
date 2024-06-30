import { Tabs } from '@/components/Tabs/Tabs.tsx'

import { Details } from './components/details/Details'
import { NetworkInfo } from './components/networkInfo/NetworkInfo'

const tabsData = [
  {
    label: 'Network',
    content: <NetworkInfo />,
  },
  {
    label: 'Details',
    content: <Details />,
  },
]

function Network() {
  return (
    <>
      <div className="mx-auto max-w-xl md:max-w-2xl">
        <Tabs tabs={tabsData} />
      </div>
    </>
  )
}

export default Network
